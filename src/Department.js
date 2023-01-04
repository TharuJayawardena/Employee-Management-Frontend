import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';
export class Department extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, edit}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }
    componentDidCMount() {
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteDep(depid){
        if(window.confirm("Are you sure")){
            fetch(process.env.REACT_APP_API+'department/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
             'Content-Type':'applicstion/json'
            }
            })
        }
    }

    render(){
        const {deps,depid,depname}=this.state;
        let addModalColse=()=>this.setState({addModalShow:false});
        let editModalColse=()=>this.setState({ModalShow:false});
        return(
            <div>
               <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr>
                    <th>DepartmentId</th>
                    <th>DepartmentName</th>
                    <th>Options</th>
                    </tr>
                   
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>Edit / Delete</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className='mr-2' variant='info' 
                                    onClick={()=>this.setState({editModalShow:true,
                                    depid:dep.DepartmentId,depname:dep.DepartmentName})}>
                                        EDIT
                                    </Button>

                                    <Button className='mr-2' variant='danger' 
                                    onClick={()=>this.deleteDep(dep.DepartmentId)}>
                                        DELETE
                                    </Button>
                                
                                <EditDepModal show={this.state.editModalShow}
                                onHide={editModalColse}
                                depid={depid}
                                depname={depname} />
                                </ButtonToolbar>
                            </td>
                        </tr>
                        
                        )}
                </tbody>
               </Table>
               <ButtonToolbar>
                <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>Add Department</Button>
               <AddDepModal show={this.state.addModalShow}
               onHide={addModalColse}/>
               </ButtonToolbar>
            </div>
        )
    }
}