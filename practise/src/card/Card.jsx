import profile from './profile.jpg'
function Card(){

    return(
        <div className="card">
            <img className="cardImage" src={profile} alt="Profile Picture"></img>
            <h2 className="cardTitle">Practise</h2>
            <p className="cardText">Having fun practising react :0</p>
        </div>
    );

}

export default Card