import { useState, useEffect } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '~/hooks';

import { formatter } from '~/utils';

import { CartBTNIcon } from '~/assets/svgs';

import Container from '~/layouts/components/Container';
import Rating from '~/components/Rating/Rating';
import Button from '~/components/Button';

import ImageSlide from '../../components/ImageSlide';
import Option from '../../components/Option';
import Quantity from '../../components/Quantity';

import { getProductRequest, getProductSelector } from '../../shoppingSlice';

import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log({ location });

  const { data } = useSelector(getProductSelector);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    color: {},
    size: {},
    quantity: 1,
  });

  const { isAuthentication } = useAuth();

  const handleSelectColor = (color) => {
    setState((prevState) => ({ ...prevState, color }));
  };

  const handleSelectSize = (size) => {
    setState((prevState) => ({ ...prevState, size }));
  };

  const handleQuantityChange = (quantity) => {
    setState((prevState) => ({ ...prevState, quantity }));
  };

  const handleAddToCard = () => {
    if (isAuthentication) {
      // handle add to card

      return;
    }

    navigate(`/auth/sign-in?_back=${location.pathname}`);
  };

  useEffect(() => {
    dispatch(getProductRequest({ id }));
  }, [id]);

  return (
    <Container>
      <div className={cx('wrapper')}>
        <div className={cx('image-slide')}>
          <ImageSlide data={data.images} />
        </div>
        <div className={cx('content')}>
          <h1 className={cx('heading')}>
            {data.isFavorite && <span className={cx('tag')}>Y??u th??ch +</span>}
            {data.name}
          </h1>
          <div className={cx('statistical-group')}>
            <div className={cx('statistical')}>
              <span className={cx('value', 'value--primary')}>
                {data.ratingAverage}
              </span>
              <Rating value={data.ratingAverage} size={14} />
            </div>
            <div className={cx('statistical')}>
              <span className={cx('value')}>{data.ratingAverage}</span>
              ????nh gi??
            </div>
            <div className={cx('statistical')}>
              <span className={cx('value')}>{data.ratingAverage}</span>
              ???? b??n
            </div>
            <div className={cx('statistical', 'report')}>T??? c??o</div>
          </div>
          <div className={cx('price-group')}>
            {data.discount ? (
              <>
                <div className={cx('price', 'old-price')}>
                  {formatter.price(data.price)}
                </div>
                <div className={cx('price', 'sell-price')}>
                  {formatter.price(data.sellPrice)}
                </div>
                <div className={cx('tag')}>{data.discount}% GI???M</div>
              </>
            ) : (
              <div className={cx('price', 'sell-price')}>{data.price}</div>
            )}
          </div>
          <div className={cx('option-group')}>
            <div className={cx('option-group__name')}>B???o hi???m</div>
            <div className={cx('option-group__value')}>B???o hi???m th???i trang</div>
          </div>
          <div className={cx('option-group')}>
            <div className={cx('option-group__name')}>M??u</div>
            <Option
              data={data.colors}
              selectedItem={state.color}
              onItemClick={handleSelectColor}
            />
          </div>
          <div className={cx('option-group')}>
            <div className={cx('option-group__name')}>Size</div>
            <Option
              data={data.sizes}
              selectedItem={state.size}
              onItemClick={handleSelectSize}
            />
          </div>

          <div className={cx('option-group')}>
            <div className={cx('option-group__name')}>S??? l?????ng</div>
            <Quantity value={state.quantity} onChange={handleQuantityChange} />
          </div>

          <div className={cx('button-group')}>
            <Button
              className={cx('btn', 'cart-btn')}
              color='primary'
              variant='outlined'
              onClick={handleAddToCard}
            >
              <CartBTNIcon /> Th??m v??o gi??? h??ng
            </Button>
            <Button className={cx('btn')} color='primary' variant='contained'>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
