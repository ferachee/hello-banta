import ImgThumb from "../../components/ImgThumb";
const list = [1, 2, 3, 4];
const Home = () => {
    return (
        <div id="name" className="uk-container uk-height-1-1 uk-flex uk-flex-middle">
            <div class='uk-width-1-1'>
                <h1 className="uk-text-primary uk-text-center">Choose a club</h1>
                <div className="uk-flex uk-flex-around">
                    { list.map( i => {
                        return <ImgThumb key="i" title={i}></ImgThumb>
                    })}
                </div>
                <h4 className="uk-text-warning uk-text-center">Where there's no banta there's no fun in football</h4>
            </div>
        </div>
    )
}

export default Home;