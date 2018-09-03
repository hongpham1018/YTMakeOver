//Create a new Component.  This component should produce some html
import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import SearchBar  from './components/searchBar';
import VideoList from './components/videoList';
import YTSearch from  'youtube-api-search';
import VideoDetail from './components/videoDetail'
const API_KEY = 'AIzaSyBRotZcIuedQsc_aUuObzbNPjTma9ZMSp4';
import _ from 'lodash';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos:[],
      selectedVideo: null,
      term:null};
      this.videoSearch("Degeneres")
  
  }
  videoSearch(term){
    
    YTSearch({key:API_KEY, term: term}, (videos)=>{
      this.setState({videos})
      this.setState({selectedVideo:videos[0]})
    });
  }
  render(){
   
    const search = _.debounce((term) => {this.videoSearch(term)}, 500); 
    return (<div> <SearchBar onSearchTermChange = {search}/>
                <VideoDetail video = {this.state.selectedVideo}></VideoDetail>
                <VideoList onVideoSelect = {
                  selectedVideo =>
                  this.setState({selectedVideo})}
                  videos={this.state.videos}></VideoList>
            </div>)
  }
}
ReactDOM.render(<App />, document.querySelector('.container'));

//react, take this component generated HTML and put it on the page(DOM)

