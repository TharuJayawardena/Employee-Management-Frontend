import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form,Image} from 'react-bootstrap';


export class AddEmpModal extends Component {
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=> {
            this.setState({deps:data});
        })
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;
    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                employeeId:null,
                employeeName:event.target.employeeName.value,
                department:event.target.department.value,
                dateOfJoining:event.target.dateOfJoining.value,
                photoFileName:event.target.photoFileName


            })
        })
            .then(res=>res.json())
            .then((result)=>{
                    alert(result)
                },
                (error)=>{
                    alert('Faild')
                })
    }
    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
            .then(res=>res.json())
            .then((result)=>{
                this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;

            },(error)=> {
                alert('Failed');
            })
    }

    render() {
        return (
            <div className='container'>
                <Modal{...this.props}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col onSubmit={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="employeeName">
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="employeeName" required placeholder='employeeName'/>
                                    </Form.Group>
                                    <Form.Group controlId="department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep=>
                                              <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="dateOfJoining">
                                        <Form.Label>DateOfJoining</Form.Label>
                                        <Form.Control
                                          type="date"
                                          name="dateOfJoining"
                                          required
                                          placeholder="dateOfJoining"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" heigt="200px" src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type="File"/>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHde}>Close</Button>
                </Modal.Footer>

            </div>
        )
    }
}
