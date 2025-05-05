import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import FunTargetComponent from '../../../components/gameComponent/FunTargetComponent';
import FunRoulletComponent from '../../../components/gameComponent/FunRoulletComponent';
import TripleFunComponent from '../../../components/gameComponent/TripleFunComponent';
import AndharBaharComponent from '../../../components/gameComponent/AndharBaharComponent';
import TitliSorratComponent from '../../../components/gameComponent/TitliSorratComponent';



function Game() {
    const dispatch = useDispatch();
    const { action, any, id } = useParams();
    const adminId = action;
    const gameId = any;
    if(gameId === "MNOQqWWi"){
        return <FunTargetComponent adminId={adminId} gameId={gameId}/>
    }

    if(gameId === "vwRORrGO"){
        return <FunRoulletComponent adminId={adminId} gameId={gameId}/>
    }
    if(gameId === "zuuhVbBM"){
        return <TripleFunComponent adminId={adminId} gameId={gameId}/>
    }

    if(gameId === "qZicXikM"){
        return <AndharBaharComponent adminId={adminId} gameId={gameId}/>
    }

    if(gameId === "qZicXikT"){
        return <TitliSorratComponent adminId={adminId} gameId={gameId}/>
    }

}

export default Game;
