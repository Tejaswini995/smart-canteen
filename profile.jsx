import Orders from "./Orders";

function Profile() {
  return (
    <div>
      <h1>My Profile</h1>

      <p>Name: Your Name</p>
      <p>Email: yourmail@gmail.com</p>

      <hr />

      <Orders />
    </div>
  );
}

export default Profile;