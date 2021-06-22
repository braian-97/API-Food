import React, { useState, useEffect } from 'react';
import Recipe from '../Recipe/Recipe';
import s from './Pagination.module.css';


export function Pagination({ recipes }) {
  const [page, setPage] = useState({
    totalPages: null,
    dataStartingIndex: null,
    dataLastIndex: 0,
    currentClickedNumber: 1,
    pageData: null,
  })
  const [dataFromPaginate, setDataFromPaginate] = useState(null);
  const [recipePerPage, setRecipePerPage] = useState(null);
  const [data, setData] = useState(recipes);
  const [totalRecipes, setTotalRecipes] = useState(null);

  var { currentClickedNumber, pageData, totalPages } = page;

  useEffect(() => {
    setData([...recipes]);
  }, [recipes])


  useEffect(() => {
    determineNumberOfPages();
  }, [data, recipePerPage, totalRecipes])


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

    let dataLength = totalRecipes ? totalRecipes : data.length;
    let chunkArray = [];
    let displayRecipes = recipePerPage ? parseInt(recipePerPage) : 10
    
    for (let index = 0; index < dataLength; index += displayRecipes) {
      let end = index + displayRecipes
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
          key={i}
        >{i}
        </button>
      );
    }
    let currentPage = (<button className={s.currentPage} onClick={(e) => { setCurrentClickedNumber(e); }}
    key={currentClickedNumber}>{currentClickedNumber} </button>)

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


  const handleChange = (e) => {
    if (e.target.value && e.target.value !== "") {
      setTotalRecipes(
        e.target.value
      )
    }
    else {
      setTotalRecipes(null)
    }
  }

  return (
    <div className={s.pagination}>
      <div className={s.filters}>
      <form className={s.searchName}>
        <div>
          <label >Show number of recipes per Page: </label>
          <input
            type="number"
            placeholder="Recipes per Page..."
            value={recipePerPage ? recipePerPage : null}
            onChange={handleInputChangeSearch}
          />
        </div>
      </form>
      <div className={s.totalRecipes}>
        <div className={s.total}>
          <h3>Total Recipes: </h3>
          <h2>{recipes.length}</h2>
        </div>
        <div className={s.totalInput}>
          <label >Total Recipes to show: </label>
          <input
            type="number"
            placeholder="Total to show..."
            value={totalRecipes ? totalRecipes : null}
            onChange={handleChange}
          />
        </div>
      </div>
      </div>
      <div className={s.recipes}>
        {dataFromPaginate ?
          dataFromPaginate.map((recipe, i) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              image={recipe.image}
              score={recipe.score}
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
                  score={recipe.score}
                  diets={recipe.diets}
                />
              );
            } else {
              return null;
            }
          })}          
      </div>

      {data.length > 0 ?
        <div className={s.numberPage}>
          <div className={s.totalNumberButtons}>
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
        : null}
    </div>
  );
};


export default Pagination;