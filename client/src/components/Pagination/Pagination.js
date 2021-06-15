import React, { useState, useEffect } from 'react';
import Recipe from '../Recipe/Recipe'

function Pagination({ recipes, diets }) {
  const [page, setPage] = useState({
    totalPages: null,
    dataStartingIndex: null,
    dataLastIndex: 0,
    currentClickedNumber: 1,
    pageData: null,
  })
  const [dataFromPaginate, setDataFromPaginate] = useState(null);
  const [recipePerPage, setRecipePerPage] = useState(null);
  const [data, setData] = useState([]);

  var { currentClickedNumber, pageData, totalPages } = page;

  useEffect(() => {
    setData([...recipes]);
  }, [recipes])


  useEffect(() => {
    determineNumberOfPages();
  }, [data, recipePerPage])


  useEffect(
    () => {
      const { currentClickedNumber, pageData } = page;
      if (pageData) {
        setDataFromPaginate(pageData[currentClickedNumber]);
      }
    },
    [page.currentClickedNumber, pageData,]
  );

  const determineNumberOfPages = () => {
    let paginatedDataObject = {};

    let index = 0;
    let dataLength = data.length;
    let chunkArray = [];
    let number = recipePerPage ? parseInt(recipePerPage) : 4
    for (index = 0; index < dataLength; index += number) {
      let end = index + number
      let newChunk = data.slice(index, end);
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
          //isClicked={currentClickedNumber === i ? true : false}
          key={i}
        >{i}
        </button>
      );
    }
    let currentPage = (<button
      className="currentPage"
      onClick={(e) => { setCurrentClickedNumber(e); }}
      //isClicked={true}
      key={currentClickedNumber}
    >{currentClickedNumber}
    </button>)
    let points = <button> ... </button>

    return [pages[currentClickedNumber - 3] ? points : null, pages[currentClickedNumber - 2], currentPage, pages[currentClickedNumber], pages[currentClickedNumber + 1] ? points : null];
  };

  const handleInputChangeSearch = function (e) {
    if (e.target.value) {
      setRecipePerPage(e.target.value);
    }
    else {
      setRecipePerPage(null);
    }
    e.preventDefault();
  }

  return (
    <div>
      <form>
        <label >Show number of recipes per Page: </label>
        <input
          type="number"
          className="mb-2 form-control"
          placeholder="Recipes per Page"
          value={recipePerPage ? recipePerPage : null}
          onChange={handleInputChangeSearch}
        />
      </form>
      <div>
        {dataFromPaginate ?
          dataFromPaginate.map((recipe, i) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              image={recipe.image}
              diets={recipe.diets}
            />
          ))
          : data.map((recipe, i) => {
            if (i < recipePerPage) {
              return (
                <Recipe
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  diets={recipe.diets}
                />
              );
            } else {
              return null;
            }
          })}
      </div>
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