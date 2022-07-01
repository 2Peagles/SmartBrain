import React from 'react';

class Signin extends React.Component {
    constructor ( props ){
        super ( props );
        this.state ={
            signInEmail : '',
            signInPassword : ''
        }
    }
    onEmailChange = ( event ) => {
        this.setstate({signinEmail: event.target.value})
    }
    onPasswordChange = ( event ) => {
        this.setstate({signinPassword: event.target.value})
    }
     onSumbitSignIn = ( ) => {
        fetch ('http: //localhost :3000/signin' , {
            method : 'post',
            headers : { 'content-Type ': 'application/json' },
            body : JSON.stringify ( {
                email : this.state.signinEmail,
                password : this.state.signInpassword
            })
        })
        .then (Response => Response.json( ))
        .then (user => {
            if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange (' home ' ) ;
            }
        })
}
     render ( ) {
return(
<article class="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main class="pa4 black-80">
    <div class="measure ">
        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
            <legend class="f1 fw6 ph0 mh0">Sign In</legend>
                <div class="mt3">
            <label class="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email"
                name="email-address" 
                 id="email-address"
                 onChange={this.onEmailChange} />
            </div>
            <div class="mv3">
            <label class="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
             class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
             type="password"
             name="password"  
             id="password"
             onChange = { this.onPasswordChange}/>
            </div>
            </fieldset>
             <div class="">
            <input 
                onClick ={ this.onSumbitSignIn} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in"/>
            </div>
            <div class="1h-copy mt3">
            <p  onClick ={ ( )=> this.onRouteChange ('register')} className ="f6 link dim black db pointer">Register Today!</p>
            </div>
    </div>
</main>
</article>
        );
    }
}
export default Signin;

//<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />