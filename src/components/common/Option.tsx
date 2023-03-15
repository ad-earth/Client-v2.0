import * as t from '../../style/option.style';

import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { OptionType, ProductDetailType } from '../../shared/types/types';
import reducer, {
  initailState,
  OPTION_ACTION_TYPE,
} from '../../shared/utils/optionReducer';
import { toast } from 'react-hot-toast';

const Option = ({ product }: PropsType) => {
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const [options, dispatch] = useReducer(reducer, initailState);
  const [totalQty, setTotalQty] = useState<number>(0);

  const { isOption, totalPrice } = useMemo(
    () => ({
      isOption:
        product?.p_Option.length > 0
          ? product?.p_Option[0][0] !== null || product?.p_Option[0][2] !== null
          : false,
      totalPrice: options
        .map(o => (product?.p_Cost + Number(o[3])) * Number(o[4]))
        .reduce((acc, cur) => acc + cur, 0),
    }),
    [product, options]
  );

  useEffect(() => {
    if (!isOption) setTotalQty(() => 1);
    else setTotalQty(() => 0);
  }, [isOption]);

  const handleAddOption = (option: OptionType) => {
    const userOption = option.slice(0, -1);
    userOption.push(1);
    userOption.push(product?.p_Cost + option[3]);

    let sameOption = options.filter(o =>
      o[0] ? o[0] === option[0] : o[2] === option[2]
    );

    if (sameOption.length) toast.error('이미 선택한 옵션입니다.');
    else {
      dispatch({
        type: OPTION_ACTION_TYPE.ADD,
        option: userOption,
      });
      setTotalQty(prev => prev + 1);
    }
    setIsDrop(false);
  };

  const handleDeleteOption = (option: UserOptionType) => {
    dispatch({
      type: OPTION_ACTION_TYPE.DELETE,
      option: option,
    });
    setTotalQty(prev => prev - Number(option[4]));
  };

  const handleAddOptQty = (option: UserOptionType) => {
    let currentQty = Number(option[4]);
    const userOption = [...option];
    userOption.splice(4, 1, currentQty + 1);

    dispatch({
      type: OPTION_ACTION_TYPE.UPDATE,
      option: userOption,
    });
    setTotalQty(prev => prev + 1);
  };

  const handleSubstractOptQty = (option: UserOptionType) => {
    let currentQty = Number(option[4]);
    const userOption = [...option];
    if (currentQty !== 1) userOption.splice(4, 1, currentQty - 1);
    else userOption.splice(4, 1, 1);

    dispatch({
      type: OPTION_ACTION_TYPE.UPDATE,
      option: userOption,
    });
    if (Number(option[4]) !== 1) setTotalQty(prev => prev - 1);
  };

  const handleSubstractQty = () => {
    setTotalQty(prev => prev - 1);
  };
  const handleAddQty = () => {
    setTotalQty(prev => prev + 1);
  };

  return (
    <t.Container>
      <p className="bold">옵션</p>
      {isOption && (
        <t.DropDown
          isDrop={isDrop}
          onClick={() => {
            setIsDrop(!isDrop);
          }}
        >
          옵션 선택
          {isDrop ? <t.IcToggleUp /> : <t.IcToggleDown />}
        </t.DropDown>
      )}
      {isOption && isDrop && (
        <t.DropMenuWrapper>
          {product.p_Option?.map((option, idx) => {
            return (
              <t.DropMenu key={idx}>
                <t.OptionWrapper onClick={() => handleAddOption(option)}>
                  {option[1] && <t.ColorIcon colorCode={option[1]} />}
                  {option[0] ? option[0] : option[2]}
                  {option[4] === 0 && '(품절)'}
                  {option[3] !== 0 && `(+${option[3]}원)`}
                </t.OptionWrapper>
              </t.DropMenu>
            );
          })}
        </t.DropMenuWrapper>
      )}

      {isOption ? (
        options.map((option, idx) => {
          return (
            <t.OptBox key={idx}>
              <t.Wrapper>
                <p>{option[0] ? option[0] : option[2]}</p>
                <button onClick={() => handleDeleteOption(option)}>𝖷</button>
              </t.Wrapper>
              <t.BtnWrapper>
                <t.Button onClick={() => handleSubstractOptQty(option)}>
                  -
                </t.Button>
                <t.Qty>{option[4]}</t.Qty>
                <t.Button
                  className="plus"
                  onClick={() => handleAddOptQty(option)}
                >
                  +
                </t.Button>
              </t.BtnWrapper>
            </t.OptBox>
          );
        })
      ) : (
        <t.OptBox>
          <t.Wrapper>
            <p>수량</p>
          </t.Wrapper>
          <t.BtnWrapper>
            <t.Button onClick={() => handleSubstractQty()}>-</t.Button>
            <t.Qty>{totalQty}</t.Qty>
            <t.Button className="plus" onClick={() => handleAddQty()}>
              +
            </t.Button>
          </t.BtnWrapper>
        </t.OptBox>
      )}
      <t.Wrapper className="price">
        총 상품 금액({totalQty}개)
        <span>{totalPrice.toLocaleString('ko-kr')}원</span>
      </t.Wrapper>
    </t.Container>
  );
};

type PropsType = {
  product: ProductDetailType;
};
type UserOptionType = (string | number)[];

export default Option;
