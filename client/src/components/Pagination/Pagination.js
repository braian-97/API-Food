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
  const [recipePerPage] = useState(4);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('predeterminado');
  const [sort, setSort] = useState('Ascendente');
  const [diet, setDiet] = useState("none");

  var { currentClickedNumber, pageData, totalPages } = page;

  console.log("recipes", recipes)
  console.log("dietas", diets)
  useEffect(() => {
     setData([...recipes]);
  }, [recipes])


  useEffect(() => {
    determineNumberOfPages();
  }, [data])


  useEffect(
    () => {
      const { currentClickedNumber, pageData } = page;
      if (pageData) {
        setDataFromPaginate(pageData[currentClickedNumber]);
      }
    },
    [page.currentClickedNumber, pageData]
  );


  useEffect(() => {
    
    const sortArray = (type) => {
      const types = {
        predeterminado: 'predeterminado',
        name: 'name',
        score: 'score',
      };
      const sortProperty = types[type];
      if (sortProperty === "predeterminado") {
        setData(recipes);  
      }
      else {
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

        // if (pageData) {
        //   const sortedFromPaginate = [...pageData[currentClickedNumber]].sort(function (a, b) {
        //     if (a[sortProperty] > b[sortProperty]) {
        //       return 1;
        //     }
        //     if (a[sortProperty] < b[sortProperty]) {
        //       return -1;
        //     }
        //     return 0;
        //   });
        //   setDataFromPaginate(sortedFromPaginate);
        // }
      }
    };
    sortArray(sortType);
  }, [sortType]);


  useEffect(() => {
    const filterByDiet = (type) => {
      if(type !== "none"){
        let result = [...recipes].filter(d => d.diets.includes(type))
        setData(result);

        // if (pageData) {
        //   const sortedFromPaginate = [...pageData[currentClickedNumber]].filter(d => d.diets.includes(type))
        //   setDataFromPaginate(sortedFromPaginate);
        // }
      }
      else{ setData(recipes); }
      }      
      filterByDiet(diet)      
  }, [diet]);


  const handleClick = () => {
    const reverseOrder = () => {
      const reverse = [...data].reverse();
      setData(reverse);
      
      // if (pageData) {
      //   const sortedFromPaginate = [...pageData[currentClickedNumber]].reverse();
      //   setDataFromPaginate(sortedFromPaginate);
      // }
    }
    reverseOrder() 
    setSort(sort === "Ascendente" ? "Descendente" : "Ascendente")  
  }


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
    let currentPage = ( <button 
      className="currentPage"
      onClick={(e) => { setCurrentClickedNumber(e); }}
      isClicked={true}
      key={currentClickedNumber}
    >{currentClickedNumber}
    </button>)
    let points = <button> ... </button>
 
    return [pages[currentClickedNumber-3] ? points : null ,pages[currentClickedNumber-2], currentPage, pages[currentClickedNumber] ,pages[currentClickedNumber+1] ? points : null];   
  };


  // const renderUserList = () =>
  //   dataFromPaginate
  //     ? dataFromPaginate.map((recipe, i) => (
  //       <Recipe
  //         key={recipe.id}
  //         name={recipe.name}
  //         image={recipe.image}
  //         diets={recipe.diets}
  //       />
  //     ))
  //     : data.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map((recipe, i) => {
  //       if (i < recipePerPage) {
  //         return (
  //           <Recipe
  //             key={recipe.id}
  //             name={recipe.name}
  //             image={recipe.image}
  //             diets={recipe.diets}
  //           />
  //         );
  //       } else {
  //         return null;
  //       }
  //     });


  return (
    <div>
      <div>
      <input
        type="text"
        className="mb-2 form-control"
        placeholder="Buscar Receta"
        value={search}
        onChange={handleInputChange}
      />
      </div>
      <div>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="predeterminado">Predeterminado</option>
          <option value="name">Alfabeto</option>
          <option value="score">Puntuación</option>
        </select>
      </div>
      <div>
        <button name={sort} onClick={() => handleClick()}
        > {sort}
        </button>
      </div>

      <div>
        <select onChange={(e) => setDiet(e.target.value)}>
        <option  value="none" >None</option>
        {diets.map((d) => (
             <option key={d.id} value={d.name} >{d.name}</option>
        )
        )}   
        </select>
      </div>
      <div>  
       {   dataFromPaginate
      ? dataFromPaginate.map((recipe, i) => (
        <Recipe
          key={recipe.id}
          name={recipe.name}
          image={recipe.image}
          diets={recipe.diets}
        />
      ))
      : data.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map((recipe, i) => {
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
      })
      }
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