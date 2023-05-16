import { ISubscribeResponse } from '@nest-react/domain';
import React, { useEffect, useState } from 'react';
import { Pagination } from '~/components/Pagination';
import { API_URL } from '~/config';
import { Logger } from '~/utils';

export const MainView = () => {
  const [tableData, setTableData] = useState<ISubscribeResponse[]>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  async function fetchPage(pageNo: number) {
    try {
      setTableData([]);
      const res = await fetch(
        API_URL + '/page?pageNo=' + pageNo + '&pageSize=10'
      );
      const data = await res.text();
      setTableData(JSON.parse(data));
    } catch (err) {
      Logger.error(err);
    }
  }

  useEffect(() => {
    async function fetchResponse(): Promise<void> {
      try {
        const res = await fetch(API_URL + '/dates');
        const data = await res.text();
        const length = JSON.parse(data).length;
        setTotalPage(Math.ceil(length / 10));

        fetchPage(0);
      } catch (err) {
        Logger.error(err);
      }
    }

    fetchResponse();
  }, []);

  return (
    <>
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal text-center">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Downloads
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                D1 Subs
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Attributed Subs
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {row.date}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {row.download}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {row.subscribe}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {row.attributed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        pageNo={page}
        totalPage={totalPage}
        onChangePage={(i: number) => {
          setPage(i);
          fetchPage(i);
        }}
      />
    </>
  );
};
