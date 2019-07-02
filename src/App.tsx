import React from 'react';
import {YMaps, Map} from 'react-yandex-maps';

export const App: React.FC = () => {
    return (
        <div className="App" style={{height: "100vh"}}>
            <YMaps>
                <Map
                    defaultState={{center: [56.630842, 47.886089], zoom: 16, conrols: []}}
                    style={{width: "100%", height: "100%"}}
                />
            </YMaps>
        </div>
    );
};
