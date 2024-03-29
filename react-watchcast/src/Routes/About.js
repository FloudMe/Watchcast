import { Component, React } from "react";
import exampleData from '../Component/exampleData';
import Navbar from "../Component/Navbar";
import './About.css';

class About extends Component {
    render() {
        return (
            <div className="background">
                <Navbar />
                <div className="labels-container">
                    {exampleData.labels.map((label1) => {
                        return (
                            <div className="support-box" key={label1.id}>
                                <input type="checkbox" id={label1.id_checkbox} />
                                <label for={label1.id_checkbox}>{label1.headline}</label>
                                <div className="content1" id={label1.content_id}>
                                    <div> {label1.info}</div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

        );
    }
}

export default About;