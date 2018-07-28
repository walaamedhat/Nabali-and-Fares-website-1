import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col, Button, Table ,FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import { BarLoader } from 'react-spinners';
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import { FormInputs } from '../../components/FormInputs/FormInputs';
import Card from "../../components/Card/Card.jsx";
import editProject from '../../actions/projectsActions/editProjectAction';
import uploadFiles from '../../actions/uploadFilesAction';
import SweetAlert from 'react-bootstrap-sweetalert';
import {handleInputChange} from '../../actions/projectsActions/transferIdProjectAction';

class EditProfile extends Component {
    constructor(props){
        super(props);
        // this.state ={
        //     city:'',
        //     street:'',
        //     district:'',
        //     projData:[]
        // }
    }
    closeWindow= () => {
        document.getElementById('editing_project').style.display = "none";;
    }
    loadWindow = () =>{
        window.location.pathname = '/ourprojects';
    }
    
    onSubmit = e => { 
        e.preventDefault();
        this.handleTypesOfApartments()
        const { editProject } = this.props
        editProject(this.state)
    }

    onPlusClick = e =>{
        const div = document.querySelector(".apartmentType_div");
        var node = document.createElement("input");
        node.type = "text"
        node.placeholder = "إضافة نوع أخر من الشقق" 
        node.className = "apartmentType_inputText";
        div.appendChild(node)
    }

    handleTypesOfApartments = e =>{
        const arrTypesOfApartment = Array.from(document.querySelectorAll('.apartmentType_inputText'));
        const realTypes = arrTypesOfApartment.map(e =>{return e.value});
        this.state.typesOfApartments = realTypes;
    }

        
    handleFilesUpload = event => {
        const file = event.target.files[0];
        const fileName = event.target.files[0].name;
        
        const data = new FormData();
        data.append('image', file);
        data.append('name', fileName);
        const { uploadFiles } = this.props;
        uploadFiles(event.target.name ,data)
    }
    onSelectedMultipleImages = (e) => {
        const photos = Array.from(e.target.files);
        const fd = new FormData();
        photos.forEach((element,i) => {
        const fileName = element.name;
        const file = element;
        fd.append('image', file);
        fd.append('name', fileName);
        })
        const { uploadFiles } = this.props;
        uploadFiles('secondaryImages', fd)
    }

    onClickRadioBtn = e => {
    this.state.star ? this.setState({star: false}) : this.setState({star: true})
    }


    onChangeInput = e => {
        const {handleInputChange} = this.props;
        // this.setState({
        //         ...this.state,
        //         [e.target.name]: e.target.value
            
        // })
        handleInputChange(e.target);
    }

    // componentDidMount(){
    //     this.setState({
    //         name:this.props.projData[0].name,
    //         _id:this.props.projData[0]._id,
    //         city:this.props.projData[0].address[2],
    //         street:this.props.projData[0].address[0],
    //         district:this.props.projData[0].address[1],
    //         description:this.props.projData[0].description,
    //         features:this.props.projData[0].features,
    //         images:this.props.projData[0].images,
    //         image360Url:this.props.projData[0].image360Url,
    //         videoUrl:this.props.projData[0].videoUrl,
    //         star: this.props.projData[0].star,
    //         typesOfApartments:this.props.projData[0].typesOfApartments
    //     })
    // }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps, 'nextprops');
        
    //     this.setState({
    //         projData: nextProps.projData
    //     })
    // }

    render(){
        const {projData} = this.props;
        console.log(projData, ' project Data');
        
        const close = <Tooltip id="edit_tooltip">Close Edit window</Tooltip>;        
        return(
            <Col md={6} id='editing_project'>
                <OverlayTrigger placement="top" overlay={close}>
                    <CustomButton bsStyle="info" simple type="button" bsSize="xs" onClick={this.closeWindow}>
                        <i className="fa fa-close" />
                    </CustomButton>
                </OverlayTrigger>
                <Card 
                    title=" عدل المشروع من هنا"
                    content = {
                    <form method="post" encType="multipart/form-data" onSubmit={this.onSubmit} id={projData[0].id}>
                        <FormInputs
                            ncols={["col-md-12"]}
                            proprieties={[
                                {
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "ادخل اسم المشروع",
                                required: true,
                                name:"name",
                                value: projData[0].name,
                                onChange: this.onChangeInput
                                }
                        ]} />
                        <h5>مكان المشروع</h5>
                        <FormInputs
                        ncols={["col-md-4", "col-md-4", "col-md-4"]}
                            proprieties={[
                                {
                                label: "اسم الشارع",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "ادخل اسم الشارع",
                                required: true,
                                name:"street",
                                value: projData[0].address[0],
                                onChange: this.onChangeInput                            

                                },
                                {
                                label: "اسم الحي",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "ادخل اسم الحي",
                                required: true,
                                name:"district",
                                value: projData[0].address[1],
                                onChange: this.onChangeInput
                                },
                                {
                                label: "اسم المدينة",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "ادخل اسم المدينة",
                                required: true,
                                name:"city",
                                value: projData[0].address[2],
                                onChange: this.onChangeInput

                                }
                            ]}
                        />
                        <Row>
                        <Col md={12}>
                            <FormGroup>
                            <h5>وصف المشروع</h5>
                            <FormControl
                                rows="5"
                                componentClass="textarea"
                                bsClass="form-control"
                                placeholder="أدخل هنا وصف للمشروع"
                                required
                                name="description"
                                onChange={this.onChangeInput}
                                value={projData[0].description}
                            />
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col md={12}>
                            <FormGroup>
                            <h5>مميزات المشروع</h5>
                            <FormControl
                                rows="5"
                                componentClass="textarea"
                                bsClass="form-control"
                                placeholder="أدخل هنا مميزات المشروع"
                                required
                                name="features"
                                onChange={this.onChangeInput}
                                value={projData[0].features}

                            />
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <div className='apartmentType'>
                            <h5>أدخل هنا أنواع الشقق في المشروع</h5>
                            <div className='apartmentType_div'>
                            <div>
                                <input type='text' className='apartmentType_inputText' placeholder='نوع الشقة مثال: شقة غربية ,شقق ارضية' />
                                <input type="button" className='apartmentType_inputButton' name="button" onClick={this.onPlusClick}/>
                            </div>
                            </div>
                        </div>
                        </Row>
                        <h5>هل يعد المشروع من ضمن المشاريع المميزة</h5>
                        <div className="radio">
                            <input id='radioBtn' name="radioBtn" type="radio" checked={projData[0].star} onClick={this.onClickRadioBtn}/>
                            <label htmlFor='radioBtn'>يعد من المشاريع المميزة ؟</label>
                        </div>
                        <h5>صور المشروع</h5>
                        <FormInputs
                        ncols={["col-md-8"]}
                        proprieties={[                        
                            {
                            label: "أدخل هنا الصور",
                            type: "file",
                            bsClass: "form-control",
                            id:'secondaryImages',
                            onChange: this.onSelectedMultipleImages,
                            multiple:true,
                            defaultValue: projData[0].images
                            }                       
                        ]}
                        />
                        <h5>صورة 360 درجة</h5>
                        <FormInputs
                            ncols={["col-md-8"]}
                            proprieties={[                        
                            {
                                label: "أدخل هنا صورة للمشروع ب360 درجة",
                                type: "file",
                                bsClass: "form-control",
                                name:"image360Url",
                                onChange:this.handleFilesUpload,
                                defaultValue:projData[0].image360Url
                            }                        
                            ]}
                            />
                        <h5>فيديو عن المشروع</h5>
                        <FormInputs
                            ncols={["col-md-8"]}
                            proprieties={[                        
                            {
                                label: "أدخل هنا الفيديو (إن وجد)",
                                type: "file",
                                bsClass: "form-control",
                                name:"video",
                                onChange:this.handleFilesUpload,
                                defaultValue:projData[0].videoUrl
                            }                        
                            ]}
                            />

                            {
                    this.props.isFetchingUpload ||this.props.isFetchingEdit ?
                      <center style={{marginBottom:'10px'}}><BarLoader width='150' height='7' color='4A90E2'/></center>
                        :this.props.messageEdit?
                            <SweetAlert 
                                success 
                                title="تم تعديل المشروع بنجاح" 
                                onConfirm={this.loadWindow}>
                                </SweetAlert>
                      :<div style={{color: "4A90E2", fontSize: "18px", textAlign:'center', marginBottom:'15px'}}>{this.props.messageUpload}</div>
                }
                        <Button bsStyle="info" block type="submit">
                            إحفظ التعديلات
                        </Button>
                        </form>
                    }
                    
                />
            </Col>
        )
    }
}


const mapStateToProps = state => {
    return {
        projData : state.editPrjectData.projectData,
        filesUrl: state.filesUrl,
        isFetchingUpload: state.filesUrl.isFetching,
        messageUpload : state.filesUrl.message,
        isFetchingEdit:state.editPrjectData.isFetching,
        messageEdit:state.editPrjectData.message,
                

    };
};

const mapDispatchToProps = {
    editProject,
    uploadFiles,
    handleInputChange       

}

  export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);