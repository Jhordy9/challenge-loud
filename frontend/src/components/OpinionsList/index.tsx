/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import Marked from 'marked';

import { FiSearch } from 'react-icons/fi';
import { Container, OpinionTimeline, Filter, Opinions } from './styles';
import { setLikedState } from '../../atoms/index';
import api from '../../services/api';
import SetUpvote from './SetUpvote/index';

interface SingleOpinion {
  opinion_id: number;
  user_id: string;
}

interface OpinionData {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  upvotes_count: number;
  available: SingleOpinion;
}

const OpinionsList: React.FC = () => {
  const [dataOpinions, setDataOpinions] = useState<OpinionData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<OpinionData[]>([]);

  const liked = useRecoilValue(setLikedState);

  useEffect(() => {
    api.get('/opinions').then(response => {
      setDataOpinions(response.data.opinions);
    });
  }, [liked, searchValue]);

  const handleSearchValue = useCallback(event => {
    setSearchValue(event.target.value);
  }, []);

  useEffect(() => {
    const results = dataOpinions.filter(data => {
      return data.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setSearchResult(results);
  }, [dataOpinions, searchValue]);

  const sortOpinions = useMemo(() => {
    return searchResult.sort((a, b) => b.id - a.id);
  }, [searchResult]);

  return (
    <Container>
      <Filter
        icon={FiSearch}
        type="text"
        value={searchValue}
        onChange={handleSearchValue}
        placeholder="Pesquisar opinião pelo título"
      />
      {sortOpinions &&
        sortOpinions.map(({ id, title, content, upvotes_count }) => (
          <OpinionTimeline key={id}>
            <Opinions>
              <p>{title}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: Marked(content) || '<p>&nbsp;</p>',
                }}
              />

              <SetUpvote id={id} upvotes_count={upvotes_count} />
            </Opinions>
          </OpinionTimeline>
        ))}
    </Container>
  );
};

export default OpinionsList;
