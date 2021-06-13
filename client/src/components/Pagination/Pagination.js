import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Recipe from '../Recipe/Recipe'

function Pagination({ recipes }) {
  const [page, setPage] = useState({
    totalPages: null,
    dataStartingIndex: null,
    dataLastIndex: 0,
    currentClickedNumber: 1,
    pageData: null
  })
  const [dataFromPaginate, setDataFromPaginate] = useState(null);
  const [recipePerPage] = useState(4);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([...recipes]);
  const [sortType, setSortType] = useState('predeterminado');

  const updateDataFromPaginate = data => setDataFromPaginate(data);


  useEffect(() => {
    determineNumberOfPages();
  }, [])

  useEffect(
    () => {
      const { currentClickedNumber, pageData } = page;
      if (pageData) {
        updateDataFromPaginate(pageData[currentClickedNumber]);
      }
    },
    [page.currentClickedNumber]
  );
  
  useEffect(() => {
    const sortArray = type => {
      const types = {
        predeterminado: 'predeterminado',
        name: 'name',
        score: 'score',
      };
      const sortProperty = types[type];
      if(sortProperty === "predeterminado"){
        setData(recipes);
      }
      else{
        const sortProperty = types[type];

        const sorted = [...data].sort(function (a, b) {
          if (a[sortProperty] > b[sortProperty]) {
            return 1;
          }
          if (a[sortProperty] < b[sortProperty]) {
            return -1;
          }
          return 0;
        });
        setData(sorted);
      }
    };
    sortArray(sortType);
  }, [sortType]);


  const handleInputChange = function (e) {
    setSearch(e.target.value);
  }
  
  const determineNumberOfPages = () => {
    let paginatedDataObject = {};

    let index = 0;
    let dataLength = data.length;
    let chunkArray = [];

    for (index = 0; index < dataLength; index += recipePerPage) {
      let newChunk = data.slice(index, index + recipePerPage);
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    setPage({
      ...page,
      totalPages: chunkArray.length,
      dataStartingIndex: recipePerPage,
      pageData: paginatedDataObject,
      clickedOnNumber: 1
    });
  };

  const setCurrentClickedNumber = e => {
    const { target } = e;
    setPage({
      ...page,
      currentClickedNumber: parseInt(target.innerText)
    });
  };

  const moveToLastPage = () => {
    setPage({
      ...page,
      currentClickedNumber: page.totalPages,
      currentClickedPage: page.totalPages
    });
  };

  const moveToFirstPage = () => {
    setPage({
      ...page,
      currentClickedNumber: 1,
      currentClickedPage: 1
    });
  };

  const moveOnePageForward = () => {
    const { dataStartingIndex, totalPages, currentClickedNumber } = page;

    if (dataStartingIndex) {
      setPage({
        ...page,
        dataStartingIndex: null,
        currentClickedNumber: 2
      });
    } else {
      setPage({
        ...page,
        currentClickedNumber:
          currentClickedNumber + 1 > totalPages
            ? totalPages
            : currentClickedNumber + 1
      });
    }
  };

  const moveOnePageBackward = () => {
    setPage({
      ...page,
      currentClickedNumber:
        page.currentClickedNumber - 1 < 1
          ? 1
          : page.currentClickedNumber - 1
    });
  };

  const pageNumberRender = () => {
    const { totalPages, currentClickedNumber } = page;
    let pages = [];
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(
        <button onClick={(e) => {
          setCurrentClickedNumber(e);
        }}
          isClicked={currentClickedNumber === i ? true : false}
          key={i}
        >{i}
        </button>
      );
    }
    return pages;
  };

  const renderUserList = () =>
    dataFromPaginate
      ? dataFromPaginate.map((recipe, i) => (
        <Recipe
          key={recipe.id}
          name={recipe.name}
          image={recipe.image}
          diets={recipe.diets}
        />
      ))
      : data.filter(poke => poke.name.toLowerCase().includes(search.toLowerCase())).map((recipe, i) => {
        if (i < recipePerPage) {
          return (
            <Recipe
              key={recipe.id}
              name={recipe.name}
              image={recipe.image}
              diets={recipe.diets}
            />
          );
        } else {
          return null;
        }
      });

  console.log(data)

  const { currentClickedNumber, totalPages } = page;
  return (
    <div>

      <input
        type="text"
        className="mb-2 form-control"
        placeholder="Buscar Receta"
        value={search}
        onChange={handleInputChange}
      />

      <select onChange={(e) => setSortType(e.target.value)}>
         <option value="predeterminado">Predeterminado</option>
        <option value="name">Alfabeto</option>
        <option value="score">Puntuación</option>

</select>
      {data ? renderUserList() : null}
      <div>
        <div>
          {currentClickedNumber > 1 ? (
            <div>
              <span>
                <button
                  onClick={() => moveToFirstPage()}>
                  &lt;&lt;
                </button>
              </span>
              <span>
                <button onClick={() => moveOnePageBackward()}>
                  &lt;
                </button>
              </span>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>{pageNumberRender()}</div>
        <div>
          {currentClickedNumber !== totalPages ? (
            <div>
              <span>
                <button onClick={() => moveOnePageForward()}
                > &gt;
                </button>
              </span>
              <span>
                <button onClick={() => moveToLastPage()}>
                  &gt;&gt;
                </button>
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

    </div>
  );
};


export default Pagination;