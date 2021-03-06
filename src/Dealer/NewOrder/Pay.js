import React from 'react';
import { Input, Form, Button, Alert, Divider, message } from 'antd';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { updateCurrentStep } from './actions';
import PropTypes from 'prop-types';
import { async } from './actions';

const FormItem = Form.Item;
@hot(module)
class Pay extends React.Component {
  handleSubmit = e => {
    const {
      pay,
      newOrder: { id },
      history,
    } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        pay({ orderId: id, updateCurrentStep, history });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      address,
      totalPrice,
      payState,
    } = this.props;
    return (
      <div>
        <Alert message="确认转账后，资金将直接打入对方账户，无法退回。" type="info" showIcon />
        <div className="pay-order-detail">
          <div className="pay-order-detail-item">
            <span className="label">付款账户：</span>
            <span>13357192674</span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">收货人姓名：</span>
            <span>{address.name}</span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">收货地址：</span>
            <span>
              {address.address.map((item, index) => (
                <span key={index}>{item} </span>
              ))}
              {address.detailAddress}
            </span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">联系方式：</span>
            <span>{address.phone}</span>
          </div>
          <div className="pay-order-detail-item">
            <span className="label">总价：</span>
            <span>￥{totalPrice}</span>
          </div>
        </div>
        <Divider />
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="支付密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入支付密码',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
          <br />
          <FormItem>
            <Button
              style={{ marginTop: 12 }}
              loading={payState.isFetching}
              type="primary"
              htmlType="submit"
            >
              支付
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Pay.propTypes = {
  address: PropTypes.object,
  form: PropTypes.object,
  history: PropTypes.object,
  newOrder: PropTypes.object,
  pay: PropTypes.func,
  payState: PropTypes.object,
  totalPrice: PropTypes.number,
};

const { pay } = async;
const mapStateToProps = state => state.NewOrder;
const mapDispatchToProps = dispatch => ({
  updateCurrentStep: payload => dispatch(updateCurrentStep(payload)),
  pay: payload => dispatch(pay(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Form.create()(Pay)));
