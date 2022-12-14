import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '~/hooks';

import { getProductsRequest, getProductsSelector } from '../../shoppingSlice';

import Container from '~/layouts/components/Container';
import Pagination from '../../components/Pagination';
import ProductList from '../../components/ProductList';
import SearchKeyword from '../../components/SearchKeyword';
import Sidebar from '../../components/Sidebar';
import Sortbar from '../../components/Sortbar';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const Home = () => {
  const {
    data: {
      data = [],
      pagination = {
        _totalRows: 1,
      },
    },
    status,
  } = useSelector(getProductsSelector);
  const dispatch = useDispatch();

  const { query, onAddQuery } = useQuery();

  const [params, setParams] = useState(() => ({
    _page: parseInt(query.page) || 1,
    _limit: parseInt(query.limit) || 50,
  }));

  const handlePageChange = (_page) => {
    setParams((prevState) => ({
      ...prevState,
      _page,
    }));

    onAddQuery({ page: _page });
  };

  useEffect(() => {
    const { page, limit, sortBy, sortType: _order = 'desc', ...rest } = query;

    let _sort;

    switch (sortBy) {
      case 'ctime':
        _sort = 'createdAt';
        break;

      case 'sales':
        _sort = 'soldQuantity';
        break;

      case 'price':
        _sort = 'sellPrice';
        break;
      default:
        break;
    }

    dispatch(
      getProductsRequest({
        ...params,
        ...rest,
        _sort,
        _order: _sort ? _order : undefined,
      })
    );
  }, [dispatch, query, params]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [query]);

  return (
    <Container className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('content')}>
        <SearchKeyword />
        <Sortbar />
        <ProductList data={data} />
        <Pagination
          page={params._page}
          limit={params._limit}
          totalRows={pagination._totalRows}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default Home;
