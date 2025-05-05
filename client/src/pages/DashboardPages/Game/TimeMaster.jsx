import 'bootstrap/dist/css/bootstrap.min.css';


import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import GameAdd from "../../../components/ActionModel/Game/GameAdd";




import TimeDataTable from '../../../components/TablesComponents/TimeDataTable';
import { fetchTimes } from '../../../stores/actions/gameActions';
import { useDispatch, useSelector } from 'react-redux';




export default function TimeMaster() {
    const { action } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTimes()).unwrap();
    }, [dispatch]);

    const { times } = useSelector((state) => state.times);


    if (action === "create") {
        return <GameAdd userType={"Game Master"} />;
    }


    if (action === undefined || action === null) {


        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Time Master</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Time
                            </Link>
                        </div>
                        <div className="card-body">
                            <TimeDataTable
                                times={times}

                            />
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}