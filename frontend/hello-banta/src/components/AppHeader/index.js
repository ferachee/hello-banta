import './index.sass';

export default function Header(props){
    return (
        <div id='app-header' className="uk-flex uk-flex-between uk-flex-middle">
            <div>
                <h4>tobanta</h4>
            </div>
            <div>
                <span uk-icon="icon: menu"></span>
            </div>
        </div>
    );
}