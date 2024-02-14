import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal";


const AddCabin = () =>
{
    return (
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button>Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm />
            </Modal.Window>

            {/* <Modal.Open opens='table'>
                <Button>Show Table</Button>
            </Modal.Open>
            <Modal.Window name='table'>
                <CabinTable />
            </Modal.Window> */}
        </Modal>
    )
}


// const AddCabin = () =>
// {

//     const [showModal, setShowModal] = useState(false);

//     return (
//         <Row>
//             <Button onClick={() => setShowModal(cur => !cur)}>Add new cabin</Button>

//             {
//                 showModal && (
//                     <Modal onClose={() => setShowModal(false)}>
//                         <CreateCabinForm onCloseModal={() => setShowModal(false)} />
//                     </Modal>
//                 )
//             }

//         </Row>
//     )
// }

export default AddCabin