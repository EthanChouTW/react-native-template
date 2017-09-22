import { getTime, getFullDate } from '../../utils/dateFormatter';
import Locales, { currencyPrice } from '../../locales';
import { FULFILLMENT_STATUS } from '../../actions/fulfillmentsActions';

const orderNumberHeight = 50;

const pickupTimeHeight = 200;

const itemTitleHeight = 120;

const addonSetItemHeight = 30;

const notesHeight = 30;

const totalAmountHeight = 200;

const lineInTable =
  "<tr><td colspan='3' height='4px' style='border-top: 1px solid black'></td></tr>";
const tableRowTagWrapper = content => `<tr>${content}</tr>`;

const tableTagWrapper = content => `<table style='font-size: 24px; width: 100%'>${content}</table>`;

const htmlBodyTagWrapper = content =>
  `<html><head><meta name='viewport' content='initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'/><meta charset='utf-8 '/></head><body style='margin: 0px; padding 0px;font-family: sans-serif; word-wrap: break-word;'>${content}</body></html>`;

const getItemTitleHtmlString = (trueQuantity, itemTitle, amount, currency, isItemCanceled) => {
  const quantityDisplay = isItemCanceled ? '' : `x${parseInt(trueQuantity, 10)}`;
  const quantityHtml = `<td width='15%' align='left' valign='middle' style='padding: 16px 0 16px 0; font-size:30px'><b>${quantityDisplay}</b></td>`;
  const itemTitleDisplay = isItemCanceled ? `<del>${itemTitle}</del>` : `${itemTitle}`;
  const titleHtml = `<td width='65%' valign='middle' style='padding: 16px 0 16px 0;'>${itemTitleDisplay}</td>`;
  const amountDisplay = isItemCanceled ? '<del>$0</del>' : `${currencyPrice(amount, currency)}`;
  const amountHtml = `<td width='20%' align='right' valign='middle' style='padding: 16px 0 16px 0;'>${amountDisplay}</td>`;
  return tableRowTagWrapper(`${quantityHtml}${titleHtml}${amountHtml}`);
};

const getItemAddonHtmlString = (addonSetItem, isItemOutOfStock, currency) => {
  const { title, price, quantity } = addonSetItem;
  const topBlankSpace = "<td width='15%' valign='middle' style='padding: 16px 0 16px 0;'></td>";
  const amount = Number(quantity) * Number(price);
  const addonTitleDisplay =
    Number(price) === 0
      ? `${title}`
      : `${title} (${currencyPrice(Math.round(amount * 100) / 100, currency)}) (x${quantity})`;
  const addonTitleSection = `<td colspan='2' width='80%' valign='top' style='padding: 0 0 8px 0; font-size:20px'>${addonTitleDisplay}</td>`;
  return isItemOutOfStock ? '' : tableRowTagWrapper(`${topBlankSpace}${addonTitleSection}`);
};

const getItemNotesHtmlString = notes => {
  const topBlankSpace = "<td width='15%' valign='middle' style='padding: 16px 0 16px 0;'></td>";
  const notesDisplay = `<td colspan='2' width='80%' valign='top' style='padding: 0 0 8px 0; font-size:20px'><b>${notes}</b></td>`;
  return tableRowTagWrapper(`${topBlankSpace}${notesDisplay}`);
};

const getTotalAmountHtmlString = (totalAmount, currency) => {
  const totalAmountWithCurrency = `${Locales.t('lbl_total_price')} = ${currencyPrice(
    totalAmount,
    currency
  )}`;
  const couponDescription = `${Locales.t('excluding_discount')}`;
  const totalAmountDisplay = tableRowTagWrapper(
    `<td colspan='3' align='right' valign='middle' style='padding: 16px 0 16px 0;'>${totalAmountWithCurrency}</td>`
  );
  const couponDescriptionDisplay = tableRowTagWrapper(
    `<td colspan='3' valign='middle' align='right' style='padding: 0 0 16px 0; font-size:20px'>${couponDescription}</td>`
  );
  return `${totalAmountDisplay}${couponDescriptionDisplay}`;
};

const getItemSectionHtml = fulfillment => {
  const { items } = fulfillment;
  let currencyUsed;
  let orderTotalAmount = 0;
  const itemDisplay = Object.keys(items)
    .map(itemId => {
      const item = items[itemId];
      const {
        quantityInCart,
        quantity,
        itemTitle,
        amount,
        amountPerUnit,
        fulfillmentStatus,
        currency,
        notes
      } = item;
      currencyUsed = currency;
      const trueQuantity = quantityInCart !== undefined ? quantityInCart : quantity;
      const totalAmount = Number(trueQuantity) * (Number(amount) / Number(amountPerUnit));
      orderTotalAmount += Math.round(totalAmount * 100) / 100;
      const isItemOutOfStock = fulfillmentStatus === FULFILLMENT_STATUS.OUT_OF_STOCK;
      const titleDisplay = getItemTitleHtmlString(
        trueQuantity,
        itemTitle,
        totalAmount,
        currency,
        isItemOutOfStock
      );
      const additionalSetItems = item.additionalSetItems;
      const addonDisplay =
        additionalSetItems !== undefined
          ? Object.keys(item.additionalSetItems)
              .map(addonSetItemKey => {
                const addonSetItem = additionalSetItems[addonSetItemKey];
                return getItemAddonHtmlString(addonSetItem, isItemOutOfStock, currency);
              })
              .reduce((temp, current) => `${temp}${current}`, '')
          : '';
      const notesDisplay = notes !== undefined ? getItemNotesHtmlString(notes) : '';
      return `${titleDisplay}${addonDisplay}${notesDisplay}${lineInTable}`;
    })
    .reduce((temp, current) => `${temp}${current}`, '');
  const totalAmountSection = getTotalAmountHtmlString(orderTotalAmount, currencyUsed);
  return tableTagWrapper(`${itemDisplay}${totalAmountSection}`);
};

export const constructHtmlString = (fulfillment, orderFulfillment) => {
  const orderNumber = `<div align='center' style='font-size:40px'><b>#${orderFulfillment.id}-${orderFulfillment
    .store.id}</b></div>`;
  const line = '<hr>';
  const getItemString = Locales.t('lbl_pickup');
  const getItemSection = `<div align='center' style='font-size:24px'>${getItemString}</div>`;
  const timeString = getTime(orderFulfillment.pickupTime);
  const timeSection = `<div align='center' style='font-size:40px'><b>${timeString}</b></div>`;
  const dateString = getFullDate(orderFulfillment.pickupTime);
  const dateSection = `<div align='center' style='font-size:24px'>${dateString}</div>`;
  const tableSection = getItemSectionHtml(fulfillment);
  const dashedLine = "<hr style='border-top: dashed 1px;'>";
  return {
    html: htmlBodyTagWrapper(
      `${orderNumber}${line}${getItemSection}${timeSection}${dateSection}${line}${tableSection}${dashedLine}`
    )
  };
};

export const countHtmlHeight = fulfillment => {
  const { items } = fulfillment;
  const itemHeight = Object.keys(items)
    .map(itemId => {
      const item = items[itemId];
      const additionalSetItems = item.additionalSetItems;
      const addonHeight =
        additionalSetItems !== undefined
          ? Object.keys(item.additionalSetItems).length * addonSetItemHeight
          : 0;
      const noteHeight = item.notes !== undefined ? notesHeight : 0;
      return itemTitleHeight + addonHeight + noteHeight;
    })
    .reduce((temp, current) => temp + current, 0);
  return orderNumberHeight + pickupTimeHeight + itemHeight + totalAmountHeight;
};
