export default function ImgThumb({title}) {
    const content = (
        <div className="uk-width-small uk-height-small uk-flex uk-flex-middle uk-flex-center" style={{'border':'1px solid lightgrey'}}>
            <h1 className="uk-margin-remove">{title}</h1>
        </div>
    );
    return content;
}