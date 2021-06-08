import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, { useState } from 'react';



function App() {

  const [listOfLinksVimeo, setListOfLinksVimeo] = useState([]);
  const [listOfLinksFlickr, setListOfLinksFlickr] = useState([]);
  const [url, setUrl] = useState("");
  const [isErrorUrl, setIsErrorUrl] = useState(false);

  const listItemsVimeo = listOfLinksVimeo.map((link) =>
    <tr>
      <td>{link.url}</td>
      <th>{link.titre}</th>
      <td>{link.auteur}</td>
      <td>{link.ajout}</td>
    </tr>

  );
  const listItemsFlickr = listOfLinksFlickr.map((link) =>
    <tr>
      <td>{link.url}</td>
      <th>{link.titre}</th>
      <td>{link.auteur}</td>
      <td>{link.ajout}</td>
    </tr>

  );

  function addLinkToList(url) {
    // console.log(`http://noembed.com/embed?url=${url}`);
    if (url.includes("vimeo.com")) {
      // ,"height":data.height,"width":data.width,"duration":data.duration 
      fetch(`http://noembed.com/embed?url=${url}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const result = { "url": data.url, "titre": data.title, "auteur": data.author_name, "ajout": data.upload_date};
          setListOfLinksVimeo([...listOfLinksVimeo, result]);
          setIsErrorUrl(false);
        });
    } else if (url.includes("flickr.com")) {
      fetch(`http://noembed.com/embed?url=${url}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const result = { "url": data.media_url, "titre": data.title, "auteur": data.author_name, "ajout": data.cache_age };
          setListOfLinksFlickr([...listOfLinksFlickr, result]);
          setIsErrorUrl(false);
        });
    } else {
      setIsErrorUrl(true);
    }

  }

  function handleChange(event) {
    setUrl(event.target.value);
    console.log(url);
  }
  return (
    <div className="main">
      <div className="row">
        <div className="col no_gutters leftside">
          <h1 className="title">Vimeo links</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">URL</th>
                <th scope="col">Titre</th>
                <th scope="col">Auteur</th>
                <th scope="col">Date d'ajout</th>
                <th scope="col">Hauteur</th>
                <th scope="col">Largeur</th>
                <th scope="col">Durée</th>
              </tr>
            </thead>
            <tbody>
              {listItemsVimeo}

            </tbody>
          </table>
          <h1 className="title">Flickr links</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">URL</th>
                <th scope="col">Titre</th>
                <th scope="col">Auteur</th>
                <th scope="col">Date d'ajout</th>
                <th scope="col">Hauteur</th>
                <th scope="col">Largeur</th>
              </tr>
            </thead>
            <tbody>
              {listItemsFlickr}

            </tbody>
          </table>


          <button className="btn btn-success" onClick={() => { addLinkToList(url) }}>Ajouter un lien</button>
          <form>
            <label>
              URL :

              </label>
            <input type="text" className="input" value={url} onChange={handleChange}></input>
            {isErrorUrl ?
              <p className="errorText">Le lien entré n'est pas valide!</p>
              :
              null}

          </form>
        </div>

      </div>

    </div>



  );
}

export default App;
