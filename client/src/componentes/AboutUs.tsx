import React from "react";
import githubIcon from "../assets/25231.png";
import linkedinIcon from "../assets/49408.png";
import Header from "./Header";
export const AboutUs = () => {
   const nojotro = [
    {
        name: "William Fleitas",
        github: "https://github.com/WilliamFleitas",
        linkedin: "https://www.linkedin.com/in/w-oni/",
        descripcion: "Añamembuy",
        pais: "Paraguay",
        image: "https://animeandgameembroidery.com/wp-content/uploads/2022/07/gear-5-laugh.jpg"
    },
    {
        name: "Ian Camu",
        github: "https://github.com/iancamudev",
        linkedin: "https://www.linkedin.com/in/ian-camu-898830181/",
        descripcion: "Añamembuy",
        pais: "Argentina",
        image: "https://animeandgameembroidery.com/wp-content/uploads/2022/07/gear-5-laugh.jpg"
    },
    {
        name: "Franco Aglieri",
        github: "https://github.com/francoag98",
        linkedin: "https://www.linkedin.com/in/francoaglieri/",
        descripcion: "Añamembuy",
        pais: "Argentina",
        image: "https://animeandgameembroidery.com/wp-content/uploads/2022/07/gear-5-laugh.jpg"
    },
    {
        name: "Sebastián Marchetti",
        github: "https://github.com/SebasUNLu",
        linkedin: "https://www.linkedin.com/in/sebasti%C3%A1n-pedro-marchetti-2a0b71210/",
        descripcion: "Añamembuy",
        pais: "Argentina",
        image: "https://animeandgameembroidery.com/wp-content/uploads/2022/07/gear-5-laugh.jpg"
    }

   ]

    return (
        <div className="flex flex-wrap items-center justify-center">
            <Header/>
            <div className="bg-black flex flex-col border border-black text-yellow p-10 m-10	">
                <h3>HenryShop es un e-commerce creado por un grupo de alumnos del Bootcamp Soyhenry, que facilita merchandising oficial de la misma, nuestro objetivo es que una persona pueda realizar una compra de manera rapida, sencilla y segura.</h3>
                <h2>Este proyecto fue creado con las siguientes tecnologías: React/Redux/ReduxToolkits, typescript, Tailwind, mongoDb/mongoose </h2>
                <p>Esto es parte del proyecto final del Bootcamp SoyHenry, por lo cual todo lo que este relacionado con el stock, los pagos, etc es ficticio</p>
            </div>
             <div>
                <p>Developers</p>
             </div>
            { nojotro.map((e) => {
                return (
                    <div className="flex flex-col border border-black bg-yellow shadow-lg mr-10 ml-10 mt-16 mb-6 delay-75 hover:bg-yellow hover:scale-105 hover:duration-300  duration-300 rounded-md hover:cursor-pointer">
                    <img src={e.image} alt={e.image} className="rounded-tl-md rounded-tr-md w-64 border-b-2 border-solid border-yellow "/>
                    <h5 className="flex flex-row items-center justify-center">{e.name}</h5>
                    <p>{e.descripcion}</p>

                    <div className="flex flex-row items-center justify-center">
                    <a  href={e.github} target="_black"> 
                    <img className="h-8 w-8" src={githubIcon} alt={githubIcon} />
                    </a>

                    <a  href={e.linkedin} target="_black"> 
                    <img className="h-8 w-8" src={linkedinIcon} alt={linkedinIcon} />
                    </a>
                    </div>

                    <p>{e.pais}</p>
                    </div>
                )
            })}
        </div>
    )
}