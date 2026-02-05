import { useParams } from 'react-router-dom';

import './ReuseOperatorRequestDetailPage.css';

export default function ReuseOperatorRequestDetailPage(){
    const { requestId } = useParams();
    
    return(
        <>
        <div>
            <div className="requestDetailPartnerInfoContainer">

            </div>
        </div>
        </>
    );
}