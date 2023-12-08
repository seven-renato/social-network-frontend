import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getInfoVisibility, getUser, searchUser, changeInfoVisility} from "../axios/apiCalls"
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Card, Col, Row } from 'antd';
import { Input, Space, Select, Button } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import UserGraphComponent from './components/UserGraphComponent';

const { Search } = Input;

export default function Home() {
    // following, followers, acquaintances
    const user = useSelector((state) => state.user.currentUser);
    const [userCurrentState, setUserCurrentState] = useState();
    const [infoVisibility, setInfoVisibility] = useState();

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
        const data = getUser(user.username).then(response => {
            if(response.status == 200) {
                sanitizeUserData(response.data)
             } else {
              handleAlertMessage("error", "Algo de errado aconteceu com a sua tentativa de login.");
            }
        })
        getInfoVisibility(user.username).then(response => {
            if(response.status == 200) {
                setChangeNameVisibility(response.data.infoVisibility.name)
                setChangeAgeVisibility(response.data.infoVisibility.age)
                setChangeFollowersVisibility(response.data.infoVisibility.followersQty)
             }
        })
    }, [])
    
    const sanitizeUserData = (data) => {
        setUserCurrentState(data)
        console.log(userCurrentState)
        var following = []
        var followers = []
        var client = []
        data.connections.following.map(f => {
            following.push({following: f})
        })
        data.connections.followers.map(f => {
            followers.push({followers: f})
        })
        data.connections.client.map (c => {
            client.push({client: c})
        })
        if (user.kind == "person") {
            var relatives = []
            var friends = []
            var acquaintances = []
            data.connections.relatives.map(r => {
                relatives.push({relatives: r})
            })
            data.connections.friends.map(f => {
                friends.push({friends: f})
            })
            data.connections.acquaintances.map(a => {
                acquaintances.push({acquaintances: a})
            })
            setRelativesDataSource(relatives)
            setFriendsDataSource(friends)
            setAcquaintancesDataSource(acquaintances)
            
        } else {
            var clients = []
            data.connections.clients.map(c => {
                clients.push({clients: c})
            })
            setClientsDataSource(clients)
        }
        setClientDataSource(client)
        setFollowingDataSource(following)
        setFollowersDataSource(followers)
        setUserData(data)
    }

    const userFollowingColumn = [{title: 'Following', dataIndex: 'following', key: 'following'}]
    const userFollowersColumn = [{title: 'Followers', dataIndex: 'followers', key: 'followers'}]
    const userClientColumn = [{title: 'Client', dataIndex: 'client', key: 'client'}]
    const personRelativeColumn = [{title: 'Relatives', dataIndex: 'relatives', key: 'relatives'}]
    const personFriendColumn = [{title: 'Friends', dataIndex: 'friends', key: 'friends'}]
    const personAcquaintancesColumn = [{title: 'Acquaintances', dataIndex: 'acquaintances', key: 'acquaintances'}]
    const orgClientsColumn = [{title: 'Clients', dataIndex: 'clients', key: 'clients'}]
    
    const [searched, setSearched] = useState(false);
    const onSearch = (value, _e, info) => {
        const data = {
            username: user.username,
            searchTerm: value
        }
        searchUser(data).then(response => {
            if(response.status == 200) {
                setFoundUsers(response.data.results)
                setSearched(true)
            }
        })

    };
       
    const [changeNameVisibility, setChangeNameVisibility] = useState();
    const handleChangeNameVisibilty = () => {
        changeInfoVisility({
            username: user.username,
            field: "name"
        }).then(response => {
            if(response.status == 200) {
                setChangeNameVisibility(!changeNameVisibility);
            }
        })
    }
    
    const [changeUsernameVisibility , setChangeUsernameVisibility] = useState(true);
    const handleChangeUsernameVisibilty = () => {
        changeInfoVisility({
            username: user.username,
            field: "username"
        }).then(response => {
            if(response.status == 200) {
                setChangeUsernameVisibility(!changeUsernameVisibility);
            }
        })
    }

    const [changeAgeVisibility , setChangeAgeVisibility] = useState(true);
    const handleChangeAgeVisibilty = () => {
        changeInfoVisility({
            username: user.username,
            field: "age"
        }).then(response => {
            if(response.status == 200) {
                setChangeAgeVisibility(!changeAgeVisibility);
            }
        })
    }
    const [changeFollowersVisibility , setChangeFollowersVisibility] = useState(true); 
    const handleChangeFollowersVisibility = () => {
        changeInfoVisility({
            username: user.username,
            field: "followersQty"
        }).then(response => {
            if(response.status == 200) {
                setChangeFollowersVisibility(!changeFollowersVisibility);
            }
        })
    }


    return (
        <>
            {userData === undefined ? "Carregando..." : (
                
                (user.kind == "person" ? (
                    <>  
                        <div className="flex flex-col justify-center items-center text-4xl mb-10 mt-10">
                            <Link to={`/social-network`}>
                                Social Network Graph
                            </Link>
                        </div>
                        <div className="mb-10">
                            <Search className="mb-1" placeholder="search for a user" enterButton="Search" size="large" onSearch={onSearch}/>
                                {!searched ? (<span></span>) : (
                                <>
                                    <div className="flex flex-col justify-center items-center mt-1">
                                        {foundUsers.map((item, index) => (
                                            <div className="mb-2">
                                                <a href={`/perfil/${item}`} key={index}>
                                                    {item}
                                                </a>
                                                <br></br>
                                            </div>
                                        ))}
                                    </div>
                                </>)}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="mb-10">
                                <Row gutter={16}>
                                    <Card title="Username" bordered={false}>
                                        {user.username}
                                    </Card>
                                    <Card title="Name" bordered={false}>
                                        {user.name} &nbsp; {(changeNameVisibility ? (<EyeOutlined onClick={handleChangeNameVisibilty}/>) : (<EyeInvisibleOutlined onClick={handleChangeNameVisibilty}/>))}
                                    </Card>
                                    <Card title="Age" bordered={false}>
                                        {user.age} &nbsp; {(changeAgeVisibility ? (<EyeOutlined onClick={handleChangeAgeVisibilty}/>) : (<EyeInvisibleOutlined onClick={handleChangeAgeVisibilty}/>))}
                                    </Card>
                                    <Card title="Followers" bordered={false}>
                                        {userCurrentState !== undefined ?(<>{userCurrentState.info.followersQty} followers</>) : (<>loading</>)} {(changeFollowersVisibility ? (<EyeOutlined onClick={handleChangeFollowersVisibility}/>) : (<EyeInvisibleOutlined onClick={handleChangeFollowersVisibility}/>))}
                                    </Card>
                                </Row>
                            </div>
                        </div>
                        <h1>Information</h1>
                        <div className="flex flex-col justify-center items-center">
                            <h1>Relations</h1>
                            <div className="flex">
                                <Table dataSource={relativesDataSource} columns={personRelativeColumn} />
                                <Table dataSource={friendsDataSource} columns={personFriendColumn} />
                                <Table dataSource={followingDataSource} columns={userFollowingColumn} />
                                <Table dataSource={followersDataSource} columns={userFollowersColumn} />
                                <Table dataSource={clientDataSource} columns={userClientColumn} />
                                <Table dataSource={acquaintancesDataSource} columns={personAcquaintancesColumn} />
                            </div>
                        </div>
                    </>
                ) : (
                    <>  
                        <div className="flex flex-col justify-center items-center text-4xl mb-10 mt-10">
                            <Link to={`/social-network`}>
                                Social Network Graph
                            </Link>
                        </div>
                        <div clas   sName="mb-10">
                            <Search className="mb-1" placeholder="search for a user" enterButton="Search" size="large" onSearch={onSearch}/>
                                {!searched ? (<span></span>) : (
                                <>
                                    <div className="flex flex-col justify-center items-center mt-1">
                                        {foundUsers.map((item, index) => (
                                            <div className="mb-2">
                                                <a href={`/perfil/${item}`} key={index}>
                                                    {item}
                                                </a>
                                                <br></br>
                                            </div>
                                        ))}
                                    </div>
                                </>)}
                        </div>
                        <div className="mb-10 flex flex-col justify-center items-center gap-4">
                            <h1>Information</h1>
                            <div className="mb-10">
                                <Row gutter={16}>
                                    <Card title="Username" bordered={false}>
                                        {user.username} &nbsp;
                                    </Card>
                                    <Card title="Nome" bordered={false}>
                                        {user.name}  &nbsp;
                                    </Card>
                                    <Card title="Followers" bordered={false}>
                                        {userCurrentState !== undefined ?(<>{userCurrentState.info.followersQty} followers</>) : (<>loading</>)}
                                    </Card>
                                </Row>
                            </div>
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
                    </>
                ))
                )}
            <div className="flex flex-col justify-center items-center text-4xl mb-10 mt-10">
                <UserGraphComponent user={user}/>
            </div>
            <Button className="bg-red-500 flex flex-col justify-center items-center text-1xl mb-10 mt-10 absolute left-11 top-0 " danger type="primary">
                <Link to={`/login`}>
                    Logout
                </Link>
            </Button>
        </>
    )
}