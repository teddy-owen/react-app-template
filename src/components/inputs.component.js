import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

////////////////////////////////////////////////////////
// Base Class
////////////////////////////////////////////////////////
class CustomInput extends React.Component{

    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        type:PropTypes.string.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        maxLength:PropTypes.number,
        minLength:PropTypes.number,
        minValue:PropTypes.number,
        maxValue:PropTypes.number,
        minDate:PropTypes.string,
        maxDate:PropTypes.string,
        step:PropTypes.number,
        pattern:PropTypes.object,
        patternErrorMessage:PropTypes.string,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
        options:PropTypes.array,
        rows:PropTypes.number,
        allowTextAreaResize:PropTypes.bool,
    };
    
    constructor(props) {
        super(props);
        this.state={
            touched:false,
            blurred:false,
            valid:false,
            showValidation:false,
            errorMessage:"",
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.modifyInput = this.modifyInput.bind(this);
        this.setShowValidation = this.setShowValidation.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);        
    }

    componentDidMount(){
        if(this.props.validateAlways || this.props.isValidCallback){
            this.validateInput(this.props.value);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        // If updated validate, update
        if(nextProps.validateAlways !== this.props.validateAlways){
            this.validateInput(nextProps.value);
        }
    }

    validateInput(inputValue){
        // check for text, email, number, password, url, tel fields

        let valid=true;
        let errorMessage="Invalid Input"; 
        
        if(this.props.isRequired && ( !inputValue ) ){
            valid=false;
            errorMessage="This is required";
        }

        // check max/min length
        if(this.props.minLength && inputValue && (inputValue.length < this.props.minLength) ){
            valid=false;
            errorMessage=`Must be at least ${this.props.minLength} characters`;
        }

        if(this.props.maxLength && (inputValue.length > this.props.maxLength) ){
            valid=false;
            errorMessage=`Must be fewer ${this.props.maxLength} characters`;
        }

        // pattern validation
        if(this.props.pattern && inputValue ){
            const regex = RegExp(this.props.pattern);
            valid=regex.test(inputValue);
            errorMessage=this.props.patternErrorMessage || `Must match pattern ${this.props.pattern}`;
        }

        // email validation
        if(this.props.type==="email" && inputValue ){
            // From: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            const regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            valid=regex.test(inputValue);
            errorMessage=`Must be a valid email`;
        }

        // number validation
        if(this.props.type==="number" && inputValue ){
            valid=!isNaN(inputValue);
            errorMessage=`Must be a number`;
        }
        
        // check max/min value
        if(this.props.minValue && inputValue && (inputValue < this.props.minValue) ){
            valid=false;
            errorMessage=`Must be at least ${this.props.minValue}`;
        }

        if(this.props.maxValue && inputValue && (inputValue > this.props.maxValue) ){
            valid=false;
            errorMessage=`Can't be greater than ${this.props.maxValue}`;
        }

        // url validation
        if(this.props.type==="url" && inputValue ){
            // From: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
            const regex = RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
            valid=regex.test(inputValue);
            errorMessage=`Must be a valid url starting with https://`;
        }

        // date validation
        if(this.props.type==="date" && inputValue && this.props.maxDate){

            let inputDateArray = inputValue.split("-");
            let inputYear = inputDateArray[0];
            let inputMonth = inputDateArray[1];
            let inputDay = inputDateArray[2];

            let maxDateArray = this.props.maxDate.split("-");
            let maxYear  = maxDateArray[0];
            let maxMonth  = maxDateArray[1];
            let maxDay = maxDateArray[2];

            // Check below max
            if(inputYear<=maxYear){
                if(inputYear===maxYear){
                    if(inputMonth<=maxMonth){
                        if(inputMonth===maxMonth){
                            if(inputDay<=maxDay){
                            }else{
                                // invalid
                                valid=false;
                                errorMessage=`Must be on or before ${this.props.maxDate}`;
                            }
                        }
                    }else{
                        // invalid
                        valid=false;
                        errorMessage=`Must be on or before ${this.props.maxDate}`;
                    }
                }
            }else{
                // invalid
                valid=false;
                errorMessage=`Must be on or before ${this.props.maxDate}`;
            }

        }
        
        if(this.props.type==="date" && inputValue && this.props.minDate){
            let inputDateArray = inputValue.split("-");
            let inputYear = inputDateArray[0];
            let inputMonth = inputDateArray[1];
            let inputDay = inputDateArray[2];

            let minDateArray = this.props.minDate.split("-");
            let minYear = minDateArray[0];
            let minMonth = minDateArray[1];
            let minDay = minDateArray[2];

            // Check above min
            if(inputYear>=minYear){
                if(inputYear===minYear){
                    if(inputMonth>=minMonth){
                        if(inputMonth===minMonth){
                            if(inputDay>=minDay){
                            }else{
                                // invalid
                                valid=false;
                                errorMessage=`Must be on or after ${this.props.minDate}`;
                            }
                        }
                    }else{
                        // invalid
                        valid=false;
                        errorMessage=`Must be on or after ${this.props.minDate}`;
                    }
                }
            }else{
                // invalid
                valid=false;
                errorMessage=`Must be on or after ${this.props.minDate}`;
            }
        }

        // custom validation
        if(this.props.customValidationFunction){
            let validationObj = this.props.customValidationFunction(inputValue);
            valid=validationObj.valid;
            errorMessage=validationObj.message;
        }

        // Alert parent of valid
        if(this.props.isValidCallback){
            this.props.isValidCallback(valid);
        }

        this.setState({
            valid:valid,
            errorMessage:errorMessage,            
        },this.setShowValidation);
    }
    
    modifyInput(event){
        if(this.props.modifyInputOnChange){
            this.props.modifyInputOnChange(event);
        }else{
            // Strip leading/trailing whitespace if not text area
            if(this.props.type!=="text-area"){
                event.target.value=event.target.value.trim();
            }

            // Cutoff at maxlength
            if(this.props.maxLength){
                event.target.value = event.target.value.substring(0,this.props.maxLength)
            }

            // if should be number, but not, don't enter it
            if(this.props.type==="number" && isNaN(event.target.value) ){
                event.target.value="";
            }

            // if tel number, modify it to be standard
            if(this.props.type==="tel"){
                event.target.value=this.formatPhoneNumber(event.target.value);
            }

        }
        return;
    }

    setShowValidation(){
        if(this.props.validateAlways){
            this.setState({showValidation:true});
        }
        if(this.props.validateOnTouched && this.state.touched){
            this.setState({showValidation:true});
        }
        if(this.props.validateOnBlur && this.state.blurred){
            this.setState({showValidation:true});
        }
        return;
    }



    handleBlur(){
        this.setState({blurred:true},()=>this.validateInput(this.props.value));
    }

    handleFocus(event){
        this.setState({touched:true});
    }

    handleChange(event){
        this.modifyInput(event);
        this.validateInput(event.target.value);
        return this.props.onChange(event);
    }
    
    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        
        if(cleaned.length===0){
            return ``;
        }

        if(cleaned.length>0 && cleaned.length<=3){
            return `${cleaned.substring(0,3)}`;
        }

        if(cleaned.length>3 && cleaned.length<=6){
            return `(${cleaned.substring(0,3)}) ${cleaned.substring(3,6)}`;
        }

        if(cleaned.length>6 && cleaned.length<=10){
            return `(${cleaned.substring(0,3)}) ${cleaned.substring(3,6)}-${cleaned.substring(6,10)}`;
        }

        if(cleaned.length>10 && cleaned.length<=11){
            let shift=1;
            return `+${cleaned.substring(0,shift)} (${cleaned.substring(0+shift,3+shift)}) ${cleaned.substring(3+shift,6+shift)}-${cleaned.substring(6+shift,10+shift)}`;
        }

        if(cleaned.length>11 && cleaned.length<=12){
            let shift=2;
            return `+${cleaned.substring(0,shift)} (${cleaned.substring(0+shift,3+shift)}) ${cleaned.substring(3+shift,6+shift)}-${cleaned.substring(6+shift,10+shift)}`;
        }

        else{
            let shift=3;
            return `+${cleaned.substring(0,shift)} (${cleaned.substring(0+shift,3+shift)}) ${cleaned.substring(3+shift,6+shift)}-${cleaned.substring(6+shift,10+shift)}`;
        }
    }

    render(){
        
        let inputStyle={
            borderRadius:"10px",
            border:this.props.error || (!this.state.valid && this.state.showValidation) ?"2px solid #fd5666":(this.props.success  || (this.state.valid && this.state.showValidation && this.props.showSuccessfulValidation) ? "2px solid #21bf45":"2px solid #a2a2a2"),
            color:this.props.error|| (!this.state.valid && this.state.showValidation)?"#fd5666":(this.props.success  || (this.state.valid && this.state.showValidation && this.props.showSuccessfulValidation) ? "#21bf45":"inherit"),
            boxShadow:this.props.error|| (!this.state.valid && this.state.showValidation)?"0px 0px 6px 0px #fd5666":(this.props.success  || (this.state.valid && this.state.showValidation && this.props.showSuccessfulValidation) ? "0px 0px 6px 0px #21bf45":"0px 0px 6px 0px rgba(0,0,0,0.75)"),
            outline:"none",
            padding:this.props.icon?"3px 14px 3px 35px":"3px 14px 3px 14px",
            // minWidth:"225px",
            width:"100%",
            backgroundColor:this.props.disabled?"#dcdcdc":"white",
            height:34,
        };

        return (
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"stretch",
                width:"100%",
                ...this.props.style,
            }}>            
                {this.props.title && 
                    <div style={{
                        fontSize:16,
                        marginBottom:5,
                    }}>
                        {this.props.title}
                    </div>
                }
                <div  style={{
                    display:"flex",
                    alignItems:"center",
                    margin:"0px 0px 5px 0px",
                    width:"100%",
                    position:"relative",
                }}>
                    
                    {this.props.icon?
                        <div style={{
                            position:"absolute",
                            padding:"0px 11px",
                            color:this.props.error || (!this.state.valid && this.state.showValidation)? "#fd5666":(this.props.success || (this.state.valid && this.state.showValidation && this.props.showSuccessfulValidation) ? "#21bf45":"#a2a2a2"),
                        }}>
                            {this.props.icon}
                        </div>:null
                    }

                    {this.props.type!=="select" && this.props.type!=="text-area" &&
                        <input type={this.props.type || "text"}
                        style={inputStyle}
                        placeholder={this.props.placeholder}
                        onChange={(event)=>this.handleChange(event)}
                        disabled={this.props.disabled}
                        value={this.props.value}
                        onFocus={(event)=>this.handleFocus(event)}
                        onBlur={(event)=>this.handleBlur(event)}
                        max={this.props.maxValue || this.props.maxDate}
                        min={this.props.minValue || this.props.minDate}
                        step={this.props.step}
                        />
                    }

                    {this.props.type==="select" &&
                        <select
                        value={this.props.value}
                        onChange={(event)=>this.handleChange(event)}
                        onFocus={(event)=>this.handleFocus(event)}
                        onBlur={(event)=>this.handleBlur(event)}
                        disabled={this.props.disabled}
                        style={inputStyle}
                        >
                            <option value={null} key={null} disabled={this.props.isRequired ? true:false} ></option>
                            {this.props.options.map((option)=>(
                                <option value={option.value} key={option.value}>{option.name}</option>
                            ))
                            }                        
                        </select>
                    }

                    {this.props.type==="text-area" &&
                        <textarea 
                        style={{
                            ...inputStyle,
                            height:"none",
                            resize: this.props.allowTextAreaResize ? "vertical":"none",
                        }}
                        placeholder={this.props.placeholder}
                        onChange={(event)=>this.handleChange(event)}
                        disabled={this.props.disabled}
                        value={this.props.value}
                        onFocus={(event)=>this.handleFocus(event)}
                        onBlur={(event)=>this.handleBlur(event)}
                        rows={this.props.rows || 3}
                        >
                        </textarea>
                    }

                </div>
                <div  style={{
                    display:"flex",
                }}>
                    <InputErrorMessage message={this.state.errorMessage} show={ !this.state.valid && this.state.showValidation }/>
                    
                    {this.props.maxLength && 
                        <div style={{
                            marginLeft:"auto",
                            fontSize:12
                        }}>
                            {this.props.value.length}/{this.props.maxLength}
                        </div>
                    }
                </div>

            </div>
        );
    }
}


////////////////////////////////////////////////////////
// Basic Inputs
////////////////////////////////////////////////////////
class CustomSelect extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string,
        options:PropTypes.array,
        onChange:PropTypes.func,
        placeholder:PropTypes.string,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        isValidCallback:PropTypes.func,   
    };
    render(){
        return (
            <CustomInput 
            type={"select"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            options={this.props.options}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}

class CustomTextArea extends React.Component{

    static propTypes={
        rows:PropTypes.number,  
        allowTextAreaResize:PropTypes.bool,
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string,
        onChange:PropTypes.func,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        maxLength:PropTypes.number,
        minLength:PropTypes.number,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    
    constructor(props) {
        super(props);
        this.state={
        };

    }
    
    render(){
        return (            
            <CustomInput 
            type={"text-area"}
            rows={this.props.rows}
            allowTextAreaResize={this.props.allowTextAreaResize}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            maxLength={this.props.maxLength}
            minLength={this.props.minLength}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}

class CustomEmailInput extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        maxLength:PropTypes.number,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    render(){
        return (
            <CustomInput 
            type={"email"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            maxLength={this.props.maxLength}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}

class CustomNumberInput extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        minValue:PropTypes.number,
        maxValue:PropTypes.number,
        step:PropTypes.number,
        pattern:PropTypes.object,
        patternErrorMessage:PropTypes.string,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    render(){
        return (
            <CustomInput 
            type={"number"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            minValue={this.props.minValue}
            maxValue={this.props.maxValue}
            step={this.props.step}
            pattern={this.props.pattern}
            patternErrorMessage={this.props.patternErrorMessage}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}

class CustomPasswordInput extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        maxLength:PropTypes.number,
        minLength:PropTypes.number,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    render(){
        return (
            <CustomInput 
            type={"password"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            maxLength={this.props.maxLength}
            minLength={this.props.minLength}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}

class CustomTelephoneInput extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    render(){
        return (
            <CustomInput 
            type={"tel"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}


class CustomTextInput extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        maxLength:PropTypes.number,
        minLength:PropTypes.number,
        pattern:PropTypes.object,
        patternErrorMessage:PropTypes.string,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    render(){
        return (
            <CustomInput 
            type={"text"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            maxLength={this.props.maxLength}
            minLength={this.props.minLength}
            pattern={this.props.pattern}
            patternErrorMessage={this.props.patternErrorMessage}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}

class CustomDateInput extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        minDate:PropTypes.string,
        maxDate:PropTypes.string,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    render(){
        return (
            <CustomInput 
            type={"date"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}
class CustomUrlInput extends React.Component{
    static propTypes={
        style:PropTypes.object,
        title:PropTypes.string,
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        placeholder:PropTypes.string,
        icon:PropTypes.element,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,
        validateAlways:PropTypes.bool,
        validateOnTouched:PropTypes.bool,
        validateOnBlur:PropTypes.bool,
        showSuccessfulValidation:PropTypes.bool,
        isRequired:PropTypes.bool,
        maxLength:PropTypes.number,
        minLength:PropTypes.number,
        modifyInputOnChange:PropTypes.func,
        customValidationFunction:PropTypes.func,
        isValidCallback:PropTypes.func,
    };
    render(){
        return (
            <CustomInput 
            type={"url"}
            style={this.props.style}
            title={this.props.title}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            icon={this.props.icon}
            error={this.props.error}
            success={this.props.success}
            disabled={this.props.disabled}
            validateAlways={this.props.validateAlways}
            validateOnTouched={this.props.validateOnTouched}
            validateOnBlur={this.props.validateOnBlur}
            showSuccessfulValidation={this.props.showSuccessfulValidation}
            isRequired={this.props.isRequired}
            maxLength={this.props.maxLength}
            minLength={this.props.minLength}
            modifyInputOnChange={this.props.modifyInputOnChange}
            customValidationFunction={this.props.customValidationFunction}
            isValidCallback={this.props.isValidCallback}
            />
        );
    }
}

////////////////////////////////////////////////////////
// Designed Inputs
////////////////////////////////////////////////////////
class EmailInput extends React.Component{
    static propTypes={
        value:PropTypes.string,
        onChange:PropTypes.func,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,     
    };

    render(){               
        return (
            <CustomInput icon={<FontAwesomeIcon icon={faEnvelope} size="1x" />} placeholder="Email" type="email" value={this.props.value} error={this.props.error} success={this.props.success} onChange={this.props.onChange} disabled={this.props.disabled}/>
        );
    }
}

class PasswordInput extends React.Component{
    static propTypes={
        value:PropTypes.string,
        onChange:PropTypes.func,
        error:PropTypes.bool,
        success:PropTypes.bool,
        disabled:PropTypes.bool,     
    };
    render(){
        return (
            <CustomInput icon={<FontAwesomeIcon icon={faLock} size="1x" />} placeholder="Password" type="password" value={this.props.value} error={this.props.error} success={this.props.success} onChange={this.props.onChange} disabled={this.props.disabled}/>
        );
    }
}

class StateSelectInput extends React.Component{
        static propTypes={
            style:PropTypes.object,
            title:PropTypes.string,
            value:PropTypes.string,
            onChange:PropTypes.func,
            placeholder:PropTypes.string,
            error:PropTypes.bool,
            success:PropTypes.bool,
            disabled:PropTypes.bool,
            validateAlways:PropTypes.bool,
            validateOnTouched:PropTypes.bool,
            validateOnBlur:PropTypes.bool,
            showSuccessfulValidation:PropTypes.bool,
            isRequired:PropTypes.bool,
            isValidCallback:PropTypes.func,   
        };
        render(){
            return (
                <CustomSelect 
                style={this.props.style}
                title={this.props.title}
                value={this.props.value}
                options={STATEOPTIONSLIST}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                error={this.props.error}
                success={this.props.success}
                disabled={this.props.disabled}
                validateAlways={this.props.validateAlways}
                validateOnTouched={this.props.validateOnTouched}
                validateOnBlur={this.props.validateOnBlur}
                showSuccessfulValidation={this.props.showSuccessfulValidation}
                isRequired={this.props.isRequired}
                isValidCallback={this.props.isValidCallback}
                />
            );
    }
}

class InputErrorMessage extends React.Component{
    static propTypes={
        message:PropTypes.string,
        show:PropTypes.bool,
        center:PropTypes.bool,
    };
    render(){
        return (
            <small style={{
                display:this.props.show?"block":"none",
                color:"#fd5666",
                fontWeight:"bold",
                textAlign:this.props.center?"center":"left",
            }}>
                {this.props.message}
            </small>
        );
    }
}

export {
    CustomInput, 
    EmailInput, 
    PasswordInput, 
    InputErrorMessage, 
    CustomTextArea, 
    CustomSelect,
    StateSelectInput,
    CustomEmailInput,
    CustomNumberInput,
    CustomPasswordInput,
    CustomTelephoneInput,
    CustomTextInput,
    CustomUrlInput,
    CustomDateInput,
};


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
