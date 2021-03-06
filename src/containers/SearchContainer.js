import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IMG_PATH } from 'utils/common';

import { Wrap, Inner, PageTitle } from 'styles/basic.style';

import Background from 'components/Background';
import NotFoundResult from 'components/NotFoundResult';
import PaginationControlled from 'components/PaginationControlled';

import styled from 'styled-components';

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
  justify-content: space-between;
  background: #fff;
  box-sizing: border-box;
  color: #000;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;

    h3 {
      font-size: 0.875rem;
    }
  }

  > li {
    a {
      > div {
        position: relative;
        width: 100%;
        padding-top: 150%;
      }
    }
    img {
      position: absolute;
      overflow: hidden;
      display: block;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
    h3 {
      margin-top: 10px;
      max-width: 200px;
    }
  }
`;

const SearchContainer = () => {
  const { lists } = useSelector(store => store.search);
  const { bgImg } = useSelector(store => store.data);

  return (
    <>
      {lists.total_results > 0 ? (
        <Wrap>
          <Inner>
            <Background bgImgs={bgImg} />
            <PageTitle>
              검색 결과 <span>{`(${lists.page}/${lists.total_pages})`}</span>
            </PageTitle>
            <CardList>
              {lists.results.map(item => {
                return (
                  <li key={item.id}>
                    <Link to={`/detail/${item.id}`}>
                      <div>
                        <img
                          src={`${IMG_PATH.w342}${item.poster_path}`}
                          onError={e => {
                            e.target.src =
                              'https://dummyimage.com/200x300.png/dddddd/999999&text=+No+Image+';
                          }}
                          alt={item.original_title}
                        />
                      </div>
                      <h3>{item.title}</h3>
                    </Link>
                  </li>
                );
              })}
            </CardList>
            <PaginationControlled
              curPage={lists.page}
              totalPage={lists.total_pages}
            />
          </Inner>
        </Wrap>
      ) : (
        <NotFoundResult text="검색 결과가 없습니다." />
      )}
    </>
  );
};

export default SearchContainer;
