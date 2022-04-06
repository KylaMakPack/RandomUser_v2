import React, {Component} from 'react';


class RandomUser extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            isLoading: false,
            error: null,
            isToggleOn: true
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.fetchRandomUser();
        this.fetchRandomUser(); 
        this.handleClick();      
    }

    // check if its clicked, if it is then go to /details and display the user
    handleClick() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
    }
    
    fetchRandomUser = async() => {
        try {
            await fetch('https://randomuser.me/api/?results=3500')
            .then(results => {
                return results.json();
            })
            .then(data => {
                let user = data.results.map((user) => {
                    let userElm = '';
                    // if nothing has been clicked then do this, if something has been clicked then show details
                    if (typeof user !== undefined && typeof user.name !== undefined && typeof user.picture != undefined) {
                        userElm = <tbody key={user.id.value}>
                                    <tr>
                                        <td>{user.name.first} {user.name.last}</td>
                                        <td>{user.email}</td>
                                        <td>{user.location.city}/ {user.location.country}</td>
                                        <td><button onClick={() => this.handleClick()}>Details</button></td>
                                    </tr>
                                </tbody>;
                    }
                    return(userElm)
                });
                this.setState({user: this.state.user.concat(user), isLoading: false});
                
            });
        }
        catch(error) {
            this.setState({ error: error, isLoading: false });
        }
    } 
    

    render() {
        let { user, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
          
        if (isLoading) {
            return <p>Loading...</p>;
        }
            return (
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr className="bg-info">
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>City/Country</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        {user}
                        {/* {this.state.isToggleOn ? 'ON' : 'OFF'} */}
                    </table>
                </div>
            )
            
        
    }
}



export default RandomUser;