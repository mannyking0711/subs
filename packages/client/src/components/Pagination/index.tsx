import React from 'react';

export const Pagination = ({
  pageNo,
  totalPage,
  onChangePage,
}: {
  pageNo: number;
  totalPage: number;
  onChangePage: any;
}) => {
  return (
    <ul className="flex py-2">
      <li>
        <a
          className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
          href="#!"
          aria-label="Previous"
          onClick={() => {
            if (pageNo === 0) {
              return;
            }
            onChangePage(pageNo - 1);
          }}
        >
          <span className="material-icons text-sm">keyboard_arrow_left</span>
        </a>
      </li>
      {Array.from(Array(totalPage), (_, i) => {
        if (i === pageNo) {
          return (
            <li key={i}>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
                href="#!"
                onClick={() => onChangePage(i)}
              >
                {i + 1}
              </a>
            </li>
          );
        } else {
          return (
            <li key={i}>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#!"
                onClick={() => onChangePage(i)}
              >
                {i + 1}
              </a>
            </li>
          );
        }
      })}
      <li>
        <a
          className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
          href="#!"
          aria-label="Next"
          onClick={() => {
            if (pageNo + 1 === totalPage) {
              return;
            }
            onChangePage(pageNo + 1);
          }}
        >
          <span className="material-icons text-sm">keyboard_arrow_right</span>
        </a>
      </li>
    </ul>
  );
};
