import React,{useState} from 'react'

function UserInfo({userInfo}) {

    const [repos,setRepos] = useState([]);

    const getRepos = () => {
        fetch(userInfo.repos_url)
          .then(res => res.json())
          .then(data => setRepos(data))
          .catch(err => console.log(err))
    }

    return (
      <>
            <div className="user-card">
                <div className="card-head">
                    <h3 className="card-heading">{userInfo.login}</h3>
                    <img src={userInfo.avatar_url} alt={userInfo.login} className="card-image"/>
                </div>
                <div className="card-info">
                        <h3>UserInfo</h3>
                        <p>Name: {userInfo.name}</p>
                        <p>Address: {userInfo.location}</p>
                        <p>Public Repos: {userInfo.public_repos}</p>
                        <p>Github Url: {userInfo.url}</p>
                        <p>Hireable: {(userInfo.hireable=== null) ? 'No' : 'Yes'}</p> 
                        <button onClick={() => getRepos()} className="btn public-Repo-btn">Public Repos</button>
                        {(repos.length>0)?<button onClick={() => setRepos([])} className="btn hide-repos-btn">Hide Repos</button> : ''}
                </div>
            </div>


            {(repos.length>=0)? 
            <div className="user-repos">{repos.map(repo => <a href={repo.html_url}  className="repos-link"><p>{repo.name}</p></a>)}
            </div> : ''}
      </>

    )
}

export default UserInfo
