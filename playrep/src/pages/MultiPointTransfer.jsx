import $ from "jquery";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/ui/Loader";

const MultiPointTransfer = () => {
    const [openSection, setOpenSection] = useState("section0");
    const [loading, setLoading] = useState(false);
    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };
    useEffect(() => {
        $("#txtFromDate").Zebra_DatePicker({
            default_position: "below",
            show_clear_date: true,
            show_select_today: "Today",
            show_icon: true,
            format: "d-M-Y",
            pair: $("#txtToDate"),
            onSelect: function () {
                $(".Zebra_DatePicker").css({
                    "background-color": "#20b7c9",
                    "border-color": "#e76f51",
                });
            },
        });

        $("#txtToDate").Zebra_DatePicker({
            default_position: "below",
            show_clear_date: true,
            show_select_today: "Today",
            show_icon: true,
            format: "d-M-Y",
            onSelect: function () {
                $(".Zebra_DatePicker").css({
                    "background-color": "#20b7c9",
                    "border-color": "#e76f51",
                });
            },
        });
        $(".Zebra_DatePicker").css({
            "background-color": "#20b7c9",
            "border-color": "#e76f51",
        });
    }, []);
    return (
        <>
            {/* Container */}
            <div className="container">
                <h2>Multiplayer Point Transfer</h2>
                <table style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td>
                                <div className="row-left">
                                    <label htmlFor="strFromDate">From Date: </label>
                                    <span className="DatePicker_Icon_Wrapper">
                                        <input id="txtFromDate" name="strFromDate" readOnly type="text" />
                                        {/* <button type="button" className="DatePicker_Icon DatePicker_Icon_Inside">Pick a date</button> */}
                                    </span>
                                </div>
                                <div className="row-mid">
                                    <label htmlFor="strToDate">To Date: </label>
                                    <span className="DatePicker_Icon_Wrapper">
                                        <input id="txtToDate" name="strToDate" readOnly type="text" />
                                        {/* <button type="button" className="DatePicker_Icon DatePicker_Icon_Inside">Pick a date</button> */}
                                    </span>
                                </div>
                                <div className="row-mid">
                                    <label htmlFor="MemberID">Member ID</label>
                                    <input id="txtMemberID" name="MemberID" type="text" />
                                </div>
                                <div className="row-right show-details-button">
                                    <input type="button" name="btnShowDetails" id="btnShowDetails" value="Show Details" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Accordion */}
                <div className="accordion" >
                    {["Multiplayer Point Transferred", "Multiplayer Points Transferred But yet to be Received", "Multiplayer Points Received", "Multiplayer Points yet to be Received", "Multiplayer Points Rejected", "Multiplayer Points Cancelled"].map((title, index) => {
                        const sectionId = `section${index}`;
                        return (
                            <div key={sectionId} >

                                <h3
                                    className={`accordion-header ${openSection === sectionId ? "active" : ""}`}
                                    onClick={() => toggleSection(sectionId)}

                                >
                                    {openSection === sectionId ? (<FontAwesomeIcon icon={faCaretDown} />) : (<FontAwesomeIcon icon={faCaretRight} />)}
                                    &nbsp;
                                    {title}
                                </h3>
                                <div
                                    className="accordion-content"
                                    style={{ display: openSection === sectionId ? "block" : "none" }}
                                >
                                    Content for {title}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {loading && <Loader show={loading} />}
            </div>
        </>
    );
};

export default MultiPointTransfer;