import React from 'react';
import PropTypes from 'prop-types';
import {
    CustomInput, 
    EmailInput, 
    PasswordInput, 
    InputErrorMessage, 
    CustomTextArea, 
    CustomSelect,
    StateSelectInput,
    CustomNumberInput,
    CustomPasswordInput,
    CustomTelephoneInput,
    CustomTextInput,
    CustomUrlInput,
    CustomDateInput,
  } from "./inputs.component.js";
import {
PrimaryButton,
} from "./buttons.component.js";
import Toast from "services/toast.service";
// import Navigation from "services/navigation.service.js";
// import {deepGet} from "services/helpers.service";

class CustomForm extends React.Component{
    static propTypes={
        style:PropTypes.object,
        children:PropTypes.node,
        formSchema:PropTypes.array,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        validateOnSubmit:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        buttonLabel:PropTypes.string,
        submissionFunction:PropTypes.func,
        submissionErrorMessage:PropTypes.string,
        submissionSuccessMessage:PropTypes.string,
        submissionSuccessRedirectFunction:PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state={
            fieldNameList:[],
            showValidation:false,
            allFieldsValid:false,
            firstValidationComplete:false,
            loading:false,
        };

        // Init input fields
        let initInputFields = (items) => {
            items.forEach((item)=>{
                if(item.type==="row"){
                    initInputFields(item.items);
                }else{
                    this.state[item.fieldName]={
                        value:item.value || "",
                        isValid:false,
                    };
                    this.state.fieldNameList.push(item.fieldName);
                }
            });
        }
        initInputFields(props.formSchema);

        
        this.handleChange = this.handleChange.bind(this);
        this.handleValidChange = this.handleValidChange.bind(this);
        this.renderInputField = this.renderInputField.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        
    }

    handleChange(key,e) {
        this.setState({ 
            [key]:{
                ...this.state[key],
                value:e.target.value,
            }
        });
        return;
    }

    handleValidChange(key,isValid) {
        let allValid=true;
        for (let index = 0; index < this.state.fieldNameList.length; index++) {
            const fieldName = this.state.fieldNameList[index];
            if(fieldName===key){
                if(!isValid){
                    allValid=false;
                }
            }else if(!this.state[fieldName].isValid){
                allValid=false;
            }
        }

        this.setState({ 
            [key]:{
                ...this.state[key],
                isValid:isValid,                
            },            
            allFieldsValid: allValid,
        });
        return;
    }

    handleSubmission() {
        if(this.props.validateOnSubmit && !this.state.allFieldsValid){
            this.setState({ 
                showValidation:true,
            });
            return;
        }

        this.setState({ 
            loading:true,
        });

        // create json
        let json = this.state.fieldNameList.reduce((prev,curr)=>({
            ...prev,
            [curr]:this.state[curr].value,
        }),{});

        // push to url
        try {
            let resp = this.props.submissionFunction(json);
            // Toast w/ this.props.submissionSuccessMessage
            Toast.success(this.props.submissionSuccessMessage);
            // Redirect
            this.props.submissionSuccessRedirectFunction();
        } catch (error) {
            // Toast w/ this.props.submissionErrorMessage
            Toast.success(this.props.submissionErrorMessage);
        }
        
        this.setState({ 
            loading:false,
        });
        return;
    }

    renderInputField(item){
        if (item.type==="row"){
            return (
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"stretch",
                    ...item.style,
                    }}>
                    {item.items.map((inputItem)=>(
                        this.renderInputField(inputItem)
                    ))}
                </div>
            );
        }
        return (
            <CustomInput
                key={item.fieldName}
                style={{
                    marginBottom:12,
                    paddingLeft:12,
                    paddingRight:12,
                    flexGrow:1,
                    ...item.style,
                }}
                type={item.type}
                title={item.title}
                value={this.state[item.fieldName].value}
                onChange={(event)=>this.handleChange(item.fieldName,event)}
                placeholder={item.placeholder}
                icon={item.icon}
                error={item.error}
                success={item.success}
                disabled={item.disabled}
                validateAlways={this.props.validateAlways || this.state.showValidation}
                validateOnTouched={this.props.validateOnTouched}
                validateOnBlur={this.props.validateOnBlur}
                showSuccessfulValidation={this.props.showSuccessfulValidation}
                isRequired={item.isRequired}
                maxLength={item.maxLength}
                minLength={item.minLength}
                minValue={item.minValue}
                maxValue={item.maxValue}
                minDate={item.minDate}
                maxDate={item.maxDate}
                step={item.step}
                pattern={item.pattern}
                patternErrorMessage={item.patternErrorMessage}
                modifyInputOnChange={item.modifyInputOnChange}
                customValidationFunction={item.customValidationFunction}
                isValidCallback={(isValid)=>this.handleValidChange(item.fieldName,isValid)}
                options={item.specialType==='state-select' ? STATEOPTIONSLIST:item.options}
                rows={item.rows}
                allowTextAreaResize={item.allowTextAreaResize}
            />
        );
    }

    render(){
        return (
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"stretch",
                ...this.props.style,
                }}>
                {this.props.formSchema.map((item)=>(
                    this.renderInputField(item)
                ))}

                <div style={{
                    marginTop:25,
                    paddingLeft:12,
                    paddingRight:12,
                }}>
                    <PrimaryButton 
                        onClick={this.handleSubmission}
                        disabled={!this.state.allFieldsValid && !this.props.validateOnSubmit}
                        loading={this.state.loading}
                    >
                        {this.props.buttonLabel}
                    </PrimaryButton>
                </div>
            </div>
        );
    }
}

export {CustomForm};


// EXAMPLE Usage
{/* <CustomForm 
// validateOnBlur={true}
// validateOnTouched={true}
validateAlways={true}
// validateOnSubmit={true}
showSuccessfulValidation={true}
buttonLabel={"Update!!!!!!"}
submissionFunction={(json)=>console.log(json)}
submissionSuccessRedirectFunction={()=>{}}
submissionSuccessMessage={"Successful Submission!"}
submissionErrorMessage={"Error Submitting."}
formSchema={[
  {
    type:"tel",
    fieldName:"phone",
    title:"MY PHONE DAMN",
    value:"789658",
    placeholder:"applws",
    isRequired:true,
  },
  {
    type:"date",
    fieldName:"s",
    title:"MY PHONE DAMN",
    value:"2020-08-09",
  },
  {
    type:"row",
    items:[
      {
        type:"text",
        fieldName:"first1",
        title:"First",
        placeholder:"First",
        isRequired:true,
      },
      
      {
        type:"row",
        items:[
          {
            type:"text",
            fieldName:"first",
            title:"First",
            placeholder:"First",
            isRequired:true,
          },
          {
            type:"text",
            fieldName:"middle",
            title:"Middle",
            placeholder:"Middle",
            isRequired:true,
          },
          {
            type:"text",
            fieldName:"last",
            title:"Last",
            placeholder:"Last",
            isRequired:true,
            // maxLength:10,
          },
          {
            type:"select",
            specialType:'state-select',
            fieldName:"usstate",
            title:"State",
            isRequired:true,
          },
        ]
      },
    ]
  },
  {
    type:"text",
    fieldName:"salesman",
    title:"Salesman",
    value:"",
    placeholder:"Salesman",
    // isRequired:true,
    minLength:20,
  },
  {
    type:"row",
    items:[
      {
        type:"text",
        fieldName:"first",
        title:"First",
        placeholder:"First",
        isRequired:true,
      },
      {
        type:"text",
        fieldName:"middle",
        title:"Middle",
        placeholder:"Middle",
        isRequired:true,
      },
      {
        type:"text",
        fieldName:"last",
        title:"Last",
        placeholder:"Last",
        isRequired:true,
        // maxLength:10,
      },
      {
        type:"select",
        specialType:'state-select',
        fieldName:"usstate",
        title:"State",
        isRequired:true,
      },
    ]
  },
  {
    type:"select",
    fieldName:"person",
    title:"Person",
    value:"",
    options:[
      {
        name:"jimmy",
        value:0,
      },
      {
        name:"Tammy",
        value:1,
      },
      {
        name:"Fabio",
        value:2,
      },
      {
        name:"FKLDFJD",
        value:3,
      },

    ],
  },

]}/> */}


const STATEOPTIONSLIST=[
    {
        name: "Alabama",
        value:"al",
    },
    {
        name: "Alaska",
        value:"ak",
    },
    {
        name: "Arizona",
        value:"az",
    },
    {
        name: "Arkansas",
        value:"ar",
    },
    {
        name: "California",
        value:"ca",
    },
    {
        name: "Colorado",
        value:"co",
    },
    {
        name: "Connecticut",
        value:"ct",
    },
    {
        name: "Delaware",
        value:"de",
    },
    {
        name: "District of Columbia",
        value:"dc",
    },
    {
        name: "Florida",
        value:"fl",
    },
    {
        name: "Guam",
        value:"gu",
    },
    {
        name: "Georgia",
        value:"ga",
    },
    {
        name: "Hawaii",
        value:"hi",
    },
    {
        name: "Idaho",
        value:"id",
    },
    {
        name: "Illinois",
        value:"il",
    },
    {
        name: "Indiana",
        value:"in",
    },
    {
        name: "Iowa",
        value:"ia",
    },
    {
        name: "Kansas",
        value:"ks",
    },
    {
        name: "Kentucky",
        value:"ky",
    },
    {
        name: "Louisiana",
        value:"la",
    },
    {
        name: "Maine",
        value:"me",
    },
    {
        name: "Maryland",
        value:"md",
    },
    {
        name: "Massachusetts",
        value:"ma",
    },
    {
        name: "Michigan",
        value:"mi",
    },
    {
        name: "Minnesota",
        value:"mn",
    },
    {
        name: "Mississippi",
        value:"ms",
    },
    {
        name: "Missouri",
        value:"mo",
    },
    {
        name: "Montana",
        value:"mt",
    },
    {
        name: "Nebraska",
        value:"ne",
    },
    {
        name: "Nevada",
        value:"nv",
    },
    {
        name: "New Hampshire",
        value:"nh",
    },
    {
        name: "New Jersey",
        value:"nj",
    },
    {
        name: "New Mexico",
        value:"nm",
    },
    {
        name: "New York",
        value:"ny",
    },
    {
        name: "North Carolina",
        value:"nc",
    },
    {
        name: "North Dakota",
        value:"nd",
    },
    {
        name: "Ohio",
        value:"oh",
    },
    {
        name: "Oklahoma",
        value:"ok",
    },
    {
        name: "Oregon",
        value:"or",
    },
    {
        name: "Pennsylvania",
        value:"pa",
    },
    {
        name: "Puerto Rico",
        value:"pr",
    },
    {
        name: "Rhode Island",
        value:"ri",
    },
    {
        name: "South Carolina",
        value:"sc",
    },
    {
        name: "South Dakota",
        value:"sd",
    },
    {
        name: "Tennessee",
        value:"tn",
    },
    {
        name: "Texas",
        value:"tx",
    },
    {
        name: "Utah",
        value:"ut",
    },
    {
        name: "Vermont",
        value:"vt",
    },
    {
        name: "Virginia",
        value:"va",
    },
    {
        name: "Virgin Islands",
        value:"vi",
    },
    {
        name: "Washington",
        value:"wa",
    },
    {
        name: "West Virginia",
        value:"wv",
    },
    {
        name: "Wisconsin",
        value:"wi",
    },
    {
        name: "Wyoming",
        value:"wy",
    },
    {
        name: "Other",
        value:"other",
    },
];
