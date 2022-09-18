import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './SignIn.module.scss';
import Group from '../../components/Group';
import Button from '~/components/Button';
import { IconQRIcon } from '~/assets/svgs';
import { InputField, PasswordField } from '~/components/Form';
import { useForm } from 'react-hook-form';
import Social from '../../components/Social';
import Redirect from '../../components/Redirect';

const cx = classNames.bind(styles);

const signInSchema = new yup.object({
  loginKey: yup.string().required('Vui lòng điền vào mục này.'),
  password: yup.string().required('Vui lòng điền vào mục này.'),
});

const SignIn = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ resolver: yupResolver(signInSchema), mode: 'onChange' });

  const handleLogin = (data) => {
    console.log({ data });
  };

  return (
    <Group className={cx('sign-in')}>
      <div className={cx('header')}>
        <h1 className={cx('header__heading')}>Đăng nhập</h1>
        <div className={cx('header__qr-tooltip')}>Đăng nhập với mã QR</div>
        <Button disabled className={cx('header__qr')}>
          <IconQRIcon />
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <InputField
          id='loginKey'
          name='loginKey'
          placeholder='Email/Số điện thoại/Tên đăng nhập'
          register={register}
          message={errors.loginKey?.message}
        />
        <PasswordField
          id='password'
          name='password'
          placeholder='Mật khẩu'
          register={register}
          message={errors.password?.message}
        />

        <Button
          type='submit'
          color='primary'
          variant='contained'
          disabled={!isValid}
        >
          ĐĂNG NHẬP
        </Button>
      </form>
      <div className={cx('helper')}>
        <Button color={'default'} className={cx('helper__btn')} disabled>
          Quên mật khẩu
        </Button>
        <Button color={'default'} className={cx('helper__btn')} disabled>
          Đăng nhập với SMS
        </Button>
      </div>
      <Social data={['facebook', 'google', 'apple']} />
      <Redirect
        label='Bạn mới biết đến Shopee?'
        to='/auth/sign-up'
        text='Đăng ký'
      />
    </Group>
  );
};

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
