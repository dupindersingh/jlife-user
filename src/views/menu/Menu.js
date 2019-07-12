import React from 'react'
import './menu.css'
import FirebaseAuth from '../misc/FirebaseAuth'
import { FirestoreDocument } from 'react-firestore'
import MenuCard from './MenuCard'
import {
    Page,
} from '../../styles/layout'


const Menu = () => (
    <Page>
        <FirebaseAuth>
            {({ isLoading, error, auth }) => {
                if (auth) {
                    return <div>
                        <div className="title-header">
                        <FirestoreDocument
                                path={"users/" + auth.email}
                                render={({ isLoading, data }) => {
                                    return isLoading ? (
                                        <img src={require("../../media/loadingIcon.gif")} alt={"loading-icon"} style={{ width: 100, height: 100 }}/>
                                    ) : (
                                        <h1 className="welcometext">Welcome {data.firstName}!</h1>
                                        )
                                }} />
                        </div>
                        <div className="menucards">
                            <div className="w-layout-grid menucard-holder-1">
                                <MenuCard title="Discover My Identity" icon="discoverIcon" link="../discover" />
                                <MenuCard title="Define My Purpose" icon="defineIcon" link="../define" />
                                <MenuCard title="Detail My Strengths" icon="detailIcon" link="../detail" />
                            </div>
                            <div className="menucard-holder-2">
                                <MenuCard title="Design My Path" icon="designIcon" link="../design" />
                                <MenuCard title="Discipline My Life" icon="disciplineIcon" link="../discipline" />
                            </div>
                        </div>
                    </div>
                }
                return null
            }}
        </FirebaseAuth>
    </Page>
)

export default Menu