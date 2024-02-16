import { carService } from "../services/car.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function TaskDetails() {

    const [car, setCar] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCar()
    }, [params.carId])


    function loadCar() {
        carService.get(params.carId)
            .then(car => setCar(car))
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onBack() {
        navigate('/car')
        // navigate(-1)
    }

    console.log('Render');

    if (!car) return <div>Loading...</div>
    return (
        <section className="car-details">
            <h1>Car Vendor: {car.vendor}</h1>
            <h1>Car Speed: {car.maxSpeed}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <button onClick={onBack}>Back</button>
            <Link to={`/car/u4QgwL`}>Next Car</Link>
        </section>
    )
}