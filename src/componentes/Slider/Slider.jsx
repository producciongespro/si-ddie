import React from 'react';
import './Slider.css';


const Slider = (props) => {
    return ( 
        <div className="slider">
			<ul>
				<li>
                <img src="https://concepto.de/wp-content/uploads/2018/08/monta%C3%B1as-e1533762816593.jpg" alt="img1" /> </li>
				<li>
                <img src={props.referencias.img+"portada1.jpg"} alt="img2" />
                </li>
				<li>
                <img src="https://i1.wp.com/noticieros.televisa.com/wp-content/uploads/2018/04/ebrio-escala-montana-alpes-intentar-regresar-su-hotel-1.jpg?resize=1045%2C602&quality=95&ssl=1" alt="img3" />
                </li>
				<li>
                <img src="https://www.chileestuyo.cl/wp-content/uploads/2018/05/lago-general-carrera1.jpg" alt="img4" />
                </li>
			</ul>
		</div>
     );
}
 
export default Slider;
