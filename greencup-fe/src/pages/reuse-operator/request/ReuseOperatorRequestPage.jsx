import './ReuseOperatorRequestPage.css';
import PercentBar from '../../../components/reuse-operator/request/percentbar/PercentBar';
export default function ReuseOperatorRequestPage(){
    return(
        <>
        <PercentBar totalRequest={1000} completedRequest={780}/>
        </>
    );
}