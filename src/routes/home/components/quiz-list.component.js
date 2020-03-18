import React from 'react';
import PropTypes from 'prop-types';
import { 
    withRouter,
} from "react-router-dom";

import { TransparentButton, ConfirmDialog} from "components";
import Navigation from "services/navigation.service.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

class QuizList extends React.Component{
    gradients={
        0:"linear-gradient(131.47deg, #2AABEB 1.82%, #6515E4 96.48%)",
        1:"linear-gradient(131.47deg, #E5D9F2 1.82%, #6515E4 96.48%)",
        2:"linear-gradient(131.47deg, #E5D9F2 1.82%, #FF6978 96.48%)",
    };

    constructor(props) {
        super(props);
        this.state={
            deleteId:null,
        };
    }
    

    static propTypes={
        history: PropTypes.object.isRequired,
        quizzes:PropTypes.array,
        edit:PropTypes.bool,
        editFunc:PropTypes.func,
        deleteFunc:PropTypes.func,
        showDeleteDialog:PropTypes.bool,
    };
    


  render(){
    
    return (
        <div style={{
            display:"flex",
            flexWrap:"wrap",
            justifyContent:"center",
        }}>
            <ConfirmDialog
                show={this.state.showDeleteDialog}
                title={"Delete Quiz?"}
                actionTitle={"Delete"}
                actionFunction={()=>{
                    this.props.deleteFunc(this.state.deleteId);
                    this.setState({showDeleteDialog:false});
                }} 
                onDismiss={()=>this.setState({showDeleteDialog:false})}
            />

            {
            this.props.quizzes.map((item, index)=>(
                <div 
                key={item.id}
                onClick={()=>{this.props.history.push(Navigation.generateQuizDetailPath(item.id))}}

                style={{
                    width:"200px",
                    height:"200px",
                    background:this.gradients[index%3],
                    borderRadius:"15px",
                    boxShadow:"5px 5px 4px rgba(0, 0, 0, 0.25)",
                    margin:"20px",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    color:"white",
                    fontSize:"22px",
                    cursor:"pointer",
                    position:"relative",
                    zIndex:"0",
                    overflow:"hidden",
                    textAlign:"center",
                }}>
                    {item.name}
                    <div style={{
                        position:"absolute",
                        zIndex:"1",
                        top:"0px",
                        display:this.props.edit?"flex":"none",
                        justifyContent:"space-between",
                        width:"100%",
                        padding:"8px 15px",
                    }}>
                        <TransparentButton children={
                            <div style={{
                                color:"#c200ff",
                            }}>
                                <FontAwesomeIcon icon={faPen} /> 
                            </div>
                        }
                        onClick={(e)=>{
                            this.props.editFunc(item);
                            e.stopPropagation();
                        }}
                        />
                        <TransparentButton children={
                            <div style={{
                                color:"red",
                            }}>
                                <FontAwesomeIcon icon={faTrash} /> 
                            </div>
                        }
                        onClick={(e)=>{
                            this.setState({deleteId:item.id,showDeleteDialog:true});
                            e.stopPropagation();
                        }}
                        />
                    </div>
                </div>
            ))}

            {this.props.quizzes.length<1 &&
                <div style={{
                display:"flex",
                justifyContent:"center",
                marginTop:"75px",
                }}>
                <h1>Add a Quiz!</h1>
                </div>
            }
        </div>
    );
  }
}


export default withRouter(QuizList);
