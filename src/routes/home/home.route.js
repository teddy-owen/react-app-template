import React from 'react';
import HTTPService from "services/http.service";
import Toast from "services/toast.service";
import {PrimaryButton, 
  CircleButton, 
  Loader, 
  ConfirmDialog, 
  InputDialog,
  CustomTextArea,
  EmailInput,
  PasswordInput,
  InputErrorMessage,
} from "components";
import QuizList from "./components/quiz-list.component";

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      loading:false,
      cocktails:[],
      showConfirmDialog:false,
      showInputDialog:false,
      dialogInput:"",
    };

    this.updateCocktails = this.updateCocktails.bind(this);
  }
  
  componentDidMount(){
    this.updateCocktails();
  }

  componentWillUnmount(){
  }

  async updateCocktails(){
    this.setState({loading:true});
    let cocktails = await HTTPService.getCocktails();
    this.setState({cocktails:cocktails,loading:false});
  }

  render(){
    return (
      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      }}>
        <h1 style={{
          textAlign:"center",
        }}>
          Home Page
        </h1>
        <div style={{
          display:"flex",
          justifyContent:"center",
          flexWrap:"wrap",
        }}>
          <div style={{
            width:"200px",
            margin:"40px 10px"
          }}>
            <PrimaryButton onClick={()=>this.setState({showConfirmDialog:true})} small={true}>
              Confirm Dialog
            </PrimaryButton>
          </div>
          <div style={{
            width:"200px",
            margin:"40px 10px"
          }}>
            <PrimaryButton onClick={()=>this.setState({showInputDialog:true})} small={true}>
              Input Dialog
            </PrimaryButton>
          </div>
          <div style={{
            width:"200px",
            margin:"40px 10px"
          }}>
            <PrimaryButton onClick={()=>Toast.success("Success!")} small={true}>
              Success Toast
            </PrimaryButton>
          </div>
          <div style={{
            width:"200px",
            margin:"40px 10px"
          }}>
            <PrimaryButton onClick={()=>Toast.error("Error!")} small={true}>
              Error Toast
            </PrimaryButton>
          </div>
          <div style={{
            width:"200px",
            margin:"40px 10px"
          }}>
            <PrimaryButton onClick={()=>Toast.info("Info!")} small={true}>
              Info Toast
            </PrimaryButton>
          </div>
          <div style={{
            width:"200px",
            margin:"40px 10px"
          }}>
            <PrimaryButton onClick={()=>Toast.warning("Warning!")} small={true}>
              Warning Toast
            </PrimaryButton>
          </div>
        </div>
        <div style={{
          margin:"10px 0px"
        }}>
          <CustomTextArea placeholder={"I'm a custom text area"} error={false} success={false}/>
        </div>
        <div style={{
          margin:"10px 0px"
        }}>
          <EmailInput error={false} success={false}/>
        </div>
        <div style={{
          margin:"10px 0px"
        }}>
          <PasswordInput error={false} success={false}/>
          <InputErrorMessage show={true} center={false} message={"I'm an input error message"}/>
        </div>

        <div style={{
          margin:"20px 0px"
        }}>

          <CircleButton onClick={()=>alert("circle button!")} backgroundColor={"rgb(255, 105, 120)"} color={"white"}>
              &times;
          </CircleButton>
        </div>
        <ConfirmDialog 
          show={this.state.showConfirmDialog} 
          onDismiss={()=>this.setState({showConfirmDialog:false})}
          title={"Sample Confirm Dialog"}
          body={"This is a sample Confirm Dialog. Do you confirm?"}
          actionTitle={"OK"}
          actionFunction={()=>{
            alert("Confirmed!");
            this.setState({showConfirmDialog:false});
          }}
        />
        
        <InputDialog 
          show={this.state.showInputDialog} 
          onDismiss={()=>this.setState({showInputDialog:false})}
          title={"Sample Input Dialog"}
          // body={"This is a sample Confirm Dialog. Do you confirm?"}
          actionTitle={"Submit"}
          actionFunction={()=>{
            alert(`Submitted: ${this.state.dialogInput}`);
            this.setState({showInputDialog:false});
          }}
          onChange={(e)=>this.setState({dialogInput:e.target.value})}
          value={this.state.dialogInput}
        />
        {this.state.loading?
          <Loader/>
          :
          <div style={{
            display:"flex",
            flexWrap:"wrap",
          }}>
            {this.state.cocktails.map((cocktail)=>(
                <div 
                key={cocktail.id}
                style={{
                  backgroundColor:"#c7c7c7",
                  padding:"12px",
                  margin:"12px",
                  borderRadius:"12px",
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  width:"200px",
                }}>
                  <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}
                    width={"100px"}
                    height={"100px"}
                  />
                  <h6 style={{
                    textAlign:"center",
                  }}>
                    {cocktail.strDrink}
                  </h6>
                </div>
              ))
            }
          </div>
        }
      </div>
    );
  }
}


export default Home;
