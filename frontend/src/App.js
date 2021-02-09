import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [reg_link, setReg_link] = useState("");
  const [when, setWhen] = useState("");
  const [about_ev, setAbout_ev] = useState("");
  const [joining_info, setJoining_info] = useState("");
  const [organised_by, setOrganised_by] = useState("");
  const [organizers, setOrganizers] = useState([]);
  const [tags, setTags] = useState([]);
  const [singletag, setSingletag] = useState("");
  const [change, setChange] = useState(false);
  const [unstructured, setFiles] = useState([]);
  const [input_text, setText] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [speakImg, setSpeakImg] = useState();
  const [speakers, setAll] = useState([]);
  const [moderator, setModerator] = useState("");
  const [allmoderators, setAllModerators] = useState([]);
  const [imagess, setImagess] = useState([]);
  //
  //
  //
  //
  //
  //
  //
  const speakHandler = (e) => {
    setSpeakImg(e.target.files[0]);
  };
  const AddSpeakerHandler = (e) => {
    // console.log(speakImg, speaker);
    var obj = {
      name: speaker,
      image: speakImg.name,
    };
    imagess.push(speakImg);
    setImagess(imagess);
    speakers.push(JSON.stringify(obj));
    setAll(speakers);
    setChange(!change);
  };
  //
  //
  //
  //
  //
  // Moderator
  const moderatorHandler = (e) => {
    setSpeakImg(e.target.files[0]);
  };
  const AddModeratorHandler = (e) => {
    var obj = {
      name: moderator,
      image: speakImg.name,
    };
    imagess.push(speakImg);
    setImagess(imagess);
    allmoderators.push(JSON.stringify(obj));
    setAllModerators(allmoderators);
    setChange(!change);
  };
  //
  //
  //
  //
  //
  //
  const fileHandler = (e) => {
    e.preventDefault();
    var img = e.target.files[0];
    img.id = new Date();
    unstructured.push(img);
    setFiles(unstructured);
    setChange(!change);
    console.log(unstructured);
  };
  //
  //
  //
  //
  //
  //
  //
  //
  const addHandler = (e) => {
    e.preventDefault();
    var obj = {
      type: "text",
      subtype: "normal",
      data: input_text,
    };
    unstructured.push(JSON.stringify(obj));
    setFiles(unstructured);
    setChange(!change);
    setText("");
    console.log(unstructured);
  };
  //
  //
  //
  //
  //
  //
  //
  //
  const submitHandler = async () => {
    var form = new FormData();
    unstructured.forEach((el) => {
      form.append("unstructured", el);
    });
    speakers.forEach((el) => {
      form.append("speakers", el);
    });
    allmoderators.forEach((el) => {
      form.append("moderators", el);
    });
    imagess.forEach((el) => {
      form.append("image", el);
    });
    form.append("title", title);
    form.append("reg_link", reg_link);
    form.append("when", when);
    form.append("about_ev", about_ev);
    form.append("joining_info", joining_info);
    form.append("organised_by", JSON.stringify(organizers));
    form.append("tags", JSON.stringify(tags));
    const { data } = await axios({
      method: "post",
      url: "/event/",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(data);
  };
  //
  //
  //
  //
  //
  //
  //
  return (
    <div className="App">
      <div className="form">
        <div className="fields">
          <label>
            {" "}
            <input
              value={title ? title : ""}
              onChange={(e) => setTitle(e.target.value)}
            ></input>{" "}
            Set title{" "}
          </label>
          <label>
            {" "}
            <input
              value={reg_link ? reg_link : ""}
              onChange={(e) => setReg_link(e.target.value)}
            ></input>{" "}
            Set Registration Link{" "}
          </label>
          <label>
            {" "}
            <input
              value={when ? when : ""}
              onChange={(e) => setWhen(e.target.value)}
            ></input>{" "}
            Set Date{" "}
          </label>
          <label>
            {" "}
            <input
              value={about_ev ? about_ev : ""}
              onChange={(e) => setAbout_ev(e.target.value)}
            ></input>{" "}
            About Event{" "}
          </label>
          <label>
            {" "}
            <input
              value={joining_info ? joining_info : ""}
              onChange={(e) => setJoining_info(e.target.value)}
            ></input>{" "}
            Joining info{" "}
          </label>
          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            {organizers.map((el) => (
              <p style={{ margin: "5px" }}>{el}</p>
            ))}
          </div>
          <label>
            {" "}
            <input
              value={organised_by ? organised_by : ""}
              onChange={(e) => {
                setOrganised_by(e.target.value);
                setOrganizers(e.target.value.split(" "));
                if (organised_by.length === 0) setOrganizers([" "]);
              }}
            ></input>{" "}
            Add organizers <span>(for full names use under_score)</span>
          </label>
          <div style={{ display: "flex" }}>
            {tags.map((el) => (
              <p style={{ margin: "5px" }}>{el}</p>
            ))}
          </div>
          <label>
            {" "}
            <input
              value={singletag ? singletag : ""}
              onChange={(e) => {
                setSingletag(e.target.value);
                setTags(e.target.value.split(" "));
              }}
            ></input>{" "}
            Add Tag{" "}
          </label>
        </div>
        <div
          className="files"
          style={{ backgroundColor: "teal", margin: "20px" }}
        >
          <h1>Unstructured</h1>
          <div className="preview">
            {unstructured.map((el, idx) => {
              if ((typeof el).toString() === "object") {
                let preview = URL.createObjectURL(el);
                return (
                  <div key={idx} className="img_container">
                    <img alt="files" className="width" src={preview}></img>
                  </div>
                );
              } else {
                let dttt = JSON.parse(el);
                return (
                  <div key={idx} className="txt_container">
                    <h5>{dttt.data}</h5>
                  </div>
                );
              }
            })}
          </div>
          <label>Select File Or Add Text</label>
          <div>
            <input
              type="file"
              name="file"
              onChange={(e) => fileHandler(e)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              value={input_text ? input_text : " "}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <button onClick={(e) => addHandler(e)}>Add text</button>
          </div>
        </div>
        {/*
         */}
        {/*
         */}
        {/* Speaker Section */}
        <div className="preview">
          {imagess.map((el, idx) => {
            if ((typeof el).toString() === "object") {
              let preview = URL.createObjectURL(el);
              return (
                <div key={idx} className="img_container">
                  <img alt="files" className="width" src={preview}></img>
                </div>
              );
            } else {
              let dttt = JSON.parse(el);
              return (
                <div key={idx} className="txt_container">
                  <h5>{dttt.data}</h5>
                </div>
              );
            }
          })}
        </div>
        <div
          className="speaker files"
          style={{ backgroundColor: "teal", margin: "20px" }}
        >
          <h1>Speakers</h1>
          <input
            type="file"
            name="file"
            onChange={(e) => speakHandler(e)}
          ></input>
          <label>
            Name
            <input
              type="text"
              placeholder={speaker ? "name" : " "}
              value={speaker ? speaker : " "}
              onChange={(e) => setSpeaker(e.target.value)}
            ></input>
          </label>
          {/* <label>
            About
            <input
              type="text"
              // placeholder={speaker ? "name" : " "}
              // value={speaker ? speaker : " "}
              // onChange={(e) => setSpeaker(e.target.value)}
            ></input>
          </label> */}
          <button onClick={(e) => AddSpeakerHandler(e)}>Add Speaker</button>
        </div>
        {/*
         */}
        {/*
         */}
        {/* Moderator Section */}
        <div
          className="speaker files"
          style={{ backgroundColor: "teal", margin: "20px" }}
        >
          <h1>Moderators</h1>
          <input
            type="file"
            name="file"
            onChange={(e) => moderatorHandler(e)}
          ></input>
          <label>
            Name
            <input
              type="text"
              placeholder={moderator ? "name" : " "}
              value={moderator ? moderator : " "}
              onChange={(e) => setModerator(e.target.value)}
            ></input>
          </label>
          {/* <label>
            About
            <input
              type="text"
              // placeholder={speaker ? "name" : " "}
              // value={speaker ? speaker : " "}
              // onChange={(e) => setSpeaker(e.target.value)}
            ></input>
          </label> */}
          <button onClick={(e) => AddModeratorHandler(e)}>Add Speaker</button>
        </div>
      </div>
      <button onClick={(e) => submitHandler()}>Submit</button>
    </div>
  );
};

export default App;
