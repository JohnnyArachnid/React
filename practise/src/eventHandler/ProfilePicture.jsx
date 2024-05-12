
function ProfilePicture(){
    const imageUrl = './src/eventHandler/profile.jpg';


    const handleClick = (event) => event.target.style.display = "none";


    return(
        <div>
            <img src={imageUrl} onClick={(event) => handleClick(event)}></img>
        </div>
    );
}
export default ProfilePicture