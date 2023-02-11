import socialDesktop from "../images/socialDesktop.PNG";
import socialMobile from "../images/socialMobile.PNG";
import "../pages/contactus.css";
function Contactus() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-7 col-sm-12 d-flex justify-content-content align-item-centre"
          id="imagesection"
        >
          <img
            className="socialDesktop"
            src={socialDesktop}
            alt=" Not available"
            style={{ height: "80%" }}
          />

          <img
            style={{ marginLeft: "3.5rem" }}
            className="socialMobile"
            src={socialMobile}
            alt=" Not available"
          />
        </div>
        <div className="col-md-5 col-sm-12" id="formsection">
          <div className="card text-center" id="contactusformcard">
            <div className="card-header" style={{ backgroundColor: "white" }}>
              <h6>
                <b>Contact Us </b>
              </h6>
            </div>
            <div className="card-body" id="cardbox">
              <form>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control input-bg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Full Name"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control input-bg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mb-2">
                  <input
                    type="phoneNumber"
                    className="form-control input-bg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Phone Number"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mb-2">
                  When can we reach you?
                  <select
                    className="form-control input-bg"
                    style={{ padding: "5px" }}
                  >
                    <option id="option">When can we reach you?</option>
                    <option id="option">9:00 am - 5:00 pm</option>
                    <option id="option">5:00 pm - 10:00pm</option>
                    <option id="option">7:00 am - 9:00am</option>
                  </select>
                </div>
                <div className="mb-2">
                  Enter your query below:
                  <textarea
                    rows="5"
                    className="form-control "
                    style={{ padding: "5px" }}
                  ></textarea>
                </div>
                <div className="mt-3 d-grid">
                  <button
                    className="custom-btn custom-btn-blue"
                    style={{ width: "100%" }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contactus;
