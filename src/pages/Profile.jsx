import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import { getInfoVisibility, getUser, searchUser, createRelation} from "../axios/apiCalls"
import { Table } from "antd";
import { set } from "react-hook-form";
import { Card, Col, Row } from 'antd';
import { Input, Space, Select, Button, Alert } from 'antd';
import { useLocation, Link } from "react-router-dom";
import UserGraphComponent from "./components/UserGraphComponent"

const { Search } = Input;

export default function Home() {
    // following, followers, acquaintances
    const user = useSelector((state) => state.user.currentUser); // User from redux
    const [currentUser, setCurrentUser] = useState();
    const [localDBUserConnections , setLocalDBUserConnections] = useState();
    
    const location = useLocation();
    const username2 = location.pathname.split("/perfil/")[1];
    if (username2 == user.username) {
        window.location.href = "/home";
    }

    
    const [userCurrentState, setUserCurrentState] = useState();
    const [userData, setUserData] = useState();
    const [relativesDataSource , setRelativesDataSource] = useState([]);
    const [friendsDataSource , setFriendsDataSource] = useState([]);
    const [followingDataSource , setFollowingDataSource] = useState([]);
    const [followersDataSource , setFollowersDataSource] = useState([]);
    const [acquaintancesDataSource , setAcquaintancesDataSource] = useState([]);
    const [clientDataSource , setClientDataSource] = useState([]);
    const [clientsDataSource , setClientsDataSource] = useState([]);
    const [foundUsers , setFoundUsers] = useState([]);

    useEffect(() => {
        getUser(username2).then( response => {
            if(response.status == 200) {
                setCurrentUser(response.data.info)
                viewRelations(localDBUserConnections)
                sanitizeUserData(response.data)
            }            
        })
    }, [username2, localDBUserConnections])
    
    useEffect(()=> {
    }, [currentUser])

    // Sanitize data from the api
    const sanitizeUserData = (data) => {
        setUserCurrentState(data);
        
        const { info, connections } = data;
        setCurrentUser(info);
        
        const following = connections.following.map((f) => ({ following: f }));
        const followers = connections.followers.map((f) => ({ followers: f }));
        const client = connections.client.map((c) => ({ client: c }));
        
        if (info.kind === "person") {
            const relatives = connections.relatives.map((r) => ({ relatives: r }));
            const friends = connections.friends.map((f) => ({ friends: f }));
            const acquaintances = connections.acquaintances.map((a) => ({ acquaintances: a }));
            
            setRelativesDataSource(relatives);
            setFriendsDataSource(friends);
            setAcquaintancesDataSource(acquaintances);
        } else {
            const clients = connections.clients.map((c) => ({ clients: c }));
            setClientsDataSource(clients);
        }
        
        setClientDataSource(client);
        setFollowingDataSource(following);
        setFollowersDataSource(followers);
        setUserData(data);
    };
    
    
    const userFollowingColumn = [{title: 'Following', dataIndex: 'following', key: 'following'}]
    const userFollowersColumn = [{title: 'Followers', dataIndex: 'followers', key: 'followers'}]
    const userClientColumn = [{title: 'Client', dataIndex: 'client', key: 'client'}]
    const personRelativeColumn = [{title: 'Relatives', dataIndex: 'relatives', key: 'relatives'}]
    const personFriendColumn = [{title: 'Friends', dataIndex: 'friends', key: 'friends'}]
    const personAcquaintancesColumn = [{title: 'Acquaintances', dataIndex: 'acquaintances', key: 'acquaintances'}]
    const orgClientsColumn = [{title: 'Clients', dataIndex: 'clients', key: 'clients'}]
    // Get current User profile data
    const [searched, setSearched] = useState(false);
    const onSearch = (value, _e, info) => {
        const data = {
            username: currentUser.username,
            searchTerm: value
        }
        searchUser(data).then(response => {
            if(response.status == 200) {
                setFoundUsers(response.data.results)
                setSearched(true)
            }
        })
        
    };
    
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowers, setIsFollowers] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isRelatives, setIsRelatives] = useState(false);
    const [isFriends, setIsFriends] = useState(false);
    const [isAcquaintances, setIsAcquaintances] = useState(false);
    useEffect(() => {
        getUser(user.username).then( response => {
            if(response.status == 200) {
                setLocalDBUserConnections(response.data.connections)
            }            
        })
    }, [])
    
    const viewRelations = (data) => {
        if (currentUser?.username && data) {
            if(data.following.includes(currentUser.username)) {
                setIsFollowing(true)
            }
            if(data.followers.includes(currentUser.username)) {
                setIsFollowers(true)
            }
            if(data.client.includes(currentUser.username)) {
                setIsClient(true)
            }
            console.log(currentUser)
            if (user.kind != "organization") {
                if(data.relatives.includes(currentUser.username)) {
                    setIsRelatives(true)
                }
                if(data.friends.includes(currentUser.username)) {
                    setIsFriends(true)
                }
                if(data.acquaintances.includes(currentUser.username)) {
                    setIsAcquaintances(true)
                }
            }
        }
    }
    // Get connections from currentUser
    useEffect(()=> {
        viewRelations(localDBUserConnections);
    }, [localDBUserConnections])
    
    // Function to addRelation with 2 user
    const addRelation = (type) => {
        if(type == "follow") {
            createRelation({username1: user.username, username2: currentUser.username, type: "follow"}).then( response => {
                if(response.status == 200) {
                    setTimeout(() => {
                        setIsFollowing(true)
                    }, 3000)
                }
            })
        }
        if(type == "client") {
            createRelation({username1: user.username, username2: currentUser.username, type: "client"}).then( response => {
                if(response.status == 200) {
                    setTimeout(() => {
                        setIsClient(true)
                    }, 5000)
                }
            })
        }
        if(type == "relative") {
            createRelation({username1: user.username, username2: currentUser.username, type: "relative"}).then( response => {
                if(response.status == 200) {
                    console.log(response.status)
                    setTimeout(() => {
                        setIsRelatives(true)
                    }, 5000)
                }
            })
        }
        if(type == "friend") {
            createRelation({username1: user.username, username2: currentUser.username, type: "friendship"}).then( response => {
                if(response.status == 200) {
                    setTimeout(() => {
                        setIsFriends(true)
                    }, 5000)
                }
            })
        }
        if(type == "acquaintance") {
            createRelation({username1: user.username, username2: currentUser.username, type: "acquaintance"}).then( response => {
                if(response.status == 200) {
                    setTimeout(() => {
                        setIsAcquaintances(true)
                    }, 5000)
                }
            })
        }        
    }


    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 6000);
    };

    const [visible, setVisible] = useState(true);

    const handleClose = () => {
      setVisible(false);
    };


    return (
        <>
            {currentUser === undefined ? "Carregando..." : (
                (currentUser.kind == "person" ? (
                    <>       
                        <div className="flex flex-col justify-center items-center text-4xl mb-10 mt-10">
                            <Link to={`/home`}>
                                {user.username}
                            </Link>
                        </div>
                        <div className="mb-10">
                            <Search className="mb-1" placeholder="search for a user" enterButton="Search" size="large" onSearch={onSearch}/>
                                {!searched ? (<span></span>) : (
                                <>
                                    <div className="flex flex-col justify-center items-center mt-1">
                                        {foundUsers.map((item, index) => (
                                            <div className="mb-2" key={index}>
                                                <a href={`/perfil/${item}`} key={index}>
                                                    {item}
                                                </a>
                                                <br></br>
                                            </div>
                                        ))}
                                    </div>
                                </>)}
                        </div>
                        <div className="mb-5">
                        { (isFollowers && visible) && (
                            <Alert message="Follows you" type="success" closable afterClose={handleClose} />
                        )}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h1>Information</h1>
                            <div className="mb-10">
                                <Row className="gap-5" gutter={20}>
                                    <Card title="Username" bordered={false}>
                                        {currentUser.username}
                                    </Card>
                                    <Card title="Name" bordered={false}>
                                        {currentUser.name} &nbsp; 
                                    </Card>
                                    <Card title="Age" bordered={false}>
                                        {currentUser.age} &nbsp;
                                    </Card>
                                    <Card title="Followers" bordered={false}>
                                        {userCurrentState !== undefined ?(<>{currentUser.followersQty} followers</>) : (<>0</>)} 
                                    </Card>
                                </Row>
                            </div>
                        </div>
                        <div className="mb-10 flex justify-center gap-4">
                            <Button type="primary" style={{ backgroundColor: isFollowing ? 'green' : '' }} loading={loadings[0]} 
                                onClick={() => {
                                    if (!isFollowing) {
                                        enterLoading(0)
                                        addRelation("follow")
                                    }
                                    }}>
                                {isFollowing ? "Already Following" : "Follow"}
                            </Button>
                            {user.kind !== "organization" && (
                                <Button type="primary" style={{ backgroundColor: isFriends ? 'green' : '' }} loading={loadings[1]} 
                                    onClick={() => {
                                        if(!isFriends) {
                                            enterLoading(1)
                                            addRelation("friend")
                                        }
                                    }}>
                                    {isFriends ? "Already Friend" : "Be friend"}
                                </Button>
                            )}
                            {/* <Button type="primary" loading={loadings[2]} onClick={() => enterLoading(2)}>
                                {isClient ? "Already Client" : "Be client"}
                            </Button> */}
                            {user.kind !== "organization" && (
                                <Button type="primary" style={{ backgroundColor: isAcquaintances ? 'green' : '' }} loading={loadings[2]} 
                                    onClick={() => {
                                            if (!isAcquaintances) {
                                                enterLoading(2)
                                                addRelation("acquaintance")
                                            }
                                        }}>
                                    {isAcquaintances ? "Already Acquaintance" : "Be Acquaintance"}
                                </Button>
                            )}
                            {user.kind !== "organization" && (
                                <Button type="primary" style={{ backgroundColor: isRelatives ? 'green' : '' }} loading={loadings[3]} 
                                    onClick={() => {
                                        if (!isRelatives) {
                                            enterLoading(3)
                                            addRelation("relative")
                                        }
                                        }}>
                                    {isRelatives ? "Already Relative" : "Be Relative"}
                                </Button>
                            )}
                        </div>
                        <h1>Relations</h1>
                        <div className="flex">
                            <Table dataSource={relativesDataSource} columns={personRelativeColumn} />
                            <Table dataSource={friendsDataSource} columns={personFriendColumn} />
                            <Table dataSource={followingDataSource} columns={userFollowingColumn} />
                            <Table dataSource={followersDataSource} columns={userFollowersColumn} />
                            <Table dataSource={clientDataSource} columns={userClientColumn} />
                            <Table dataSource={acquaintancesDataSource} columns={personAcquaintancesColumn} />
                        </div>
                        <UserGraphComponent user={currentUser}/>                     
                    </>
                ) : (
                    <>  
                        <div className="flex flex-col justify-center items-center text-4xl mb-10 mt-10">
                            <Link to={`/home`}>
                                {user.username}
                            </Link>
                        </div>
                        <div className="mb-10"> 
                            <Search className="mb-1" placeholder="search for a user" enterButton="Search" size="large" onSearch={onSearch}/>
                            {!searched ? (<span></span>) : (
                            <>
                                <div className="flex flex-col justify-center items-center mt-1">
                                    {foundUsers.map((item, index) => (
                                        <div className="mb-2" key={index}>
                                            <a href={`/perfil/${item}`} key={index}>
                                                {item}
                                            </a>
                                            <br></br>
                                        </div>
                                    ))}
                                </div>
                            </>)}
                        </div>
                        { (isFollowers && visible) && (
                            <Alert message="Follows you" type="success" closable afterClose={handleClose} />
                        )}
                        <div className="flex flex-col justify-center items-center">
                            <h1>Information</h1>
                            <div className="mb-10">
                                <Row gutter={30}>
                                    <Card title="Username" bordered={false}>
                                        {currentUser.username} &nbsp;
                                    </Card>
                                    <Card title="Nome" bordered={false}>
                                        {currentUser.name}  &nbsp;
                                    </Card>                             
                                    <Card title="Followers" bordered={false}>
                                    {userCurrentState !== undefined ?(<>{currentUser.followersQty} followers</>) : (<>0</>)} 
                                    </Card>
                                </Row>
                            </div>
                        </div>
                        <div className="mb-10 flex justify-center gap-4">
                            <Button type="primary" style={{ backgroundColor: isFollowing ? 'green' : '' }} loading={loadings[0]} 
                                onClick={() => {
                                    if (!isFollowing) {
                                        enterLoading(0)
                                        addRelation("follow")
                                    }
                                    }}>
                                {isFollowing ? "Already Following" : "Follow"}
                            </Button>
                            <Button type="primary" style={{ backgroundColor: isClient ? 'green' : '' }} loading={loadings[1]} 
                                onClick={() => {
                                    if (!isClient) {
                                        enterLoading(1)
                                        addRelation("client")
                                    }
                                    }}>
                                {isClient ? "Already Client" : "Be client"}
                            </Button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h1>Relations</h1>
                            <div className="flex">
                                <Table dataSource={clientsDataSource} columns={orgClientsColumn} />
                                <Table dataSource={clientDataSource} columns={userClientColumn} />
                                <Table dataSource={followingDataSource} columns={userFollowingColumn} />
                                <Table dataSource={followersDataSource} columns={userFollowersColumn} />
                            </div>
                        </div>
                        <UserGraphComponent user={currentUser}/>                     
                    </>
                ))
            )}
        </>
    )
}