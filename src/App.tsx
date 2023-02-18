import { useEffect, useState } from 'react';
import { CardCarnivalGroup } from './components/CardCarnivalGroup';
import { CarnivalGroup, SearchFields } from './global/Types';

import locationIcon from './assets/icon/location.svg';
import searchIcon from './assets/icon/search.svg';

const CarnivalGroupList: CarnivalGroup[] = [
  {
    coverPath: '/pics/1.jpg',
    title: 'O Python do vovô não sobe mais',
    location: { city: 'São Paulo', state: 'SP' },
  },
  {
    coverPath: '/pics/2.jpg',
    title: 'Todo mundo null',
    location: { city: 'Florianópolis', state: 'SC' },
  },
  {
    coverPath: '/pics/3.jpg',
    title: 'Hoje dou exception',
    location: { city: 'Curitiba', state: 'PR' },
  },
  {
    coverPath: '/pics/4.jpg',
    title: 'Manda Node',
    location: { city: 'Salvador', state: 'BA' },
  },
  {
    coverPath: '/pics/5.jpg',
    title: 'Só no back-end',
    location: { city: 'São Paulo', state: 'SP' },
  },
  {
    coverPath: '/pics/6.jpg',
    title: 'Esse anel não é de Ruby',
    location: { city: 'São Paulo', state: 'SP' },
  },
  {
    coverPath: '/pics/7.jpg',
    title: 'Pimenta no C# dos outros é refresco',
    location: { city: 'Rio de Janeiro', state: 'RJ' },
  },
  {
    coverPath: '/pics/8.jpg',
    title: 'EnCACHE aqui',
    location: { city: 'Porto Alegre', state: 'RS' },
  },
  {
    coverPath: '/pics/9.jpg',
    title: 'Não valho nada mas JAVA li',
    location: { city: 'São Paulo', state: 'SP' },
  },
];

function App() {
  const [groups, setGroups] = useState<CarnivalGroup[]>(CarnivalGroupList);

  const [search, setSearch] = useState<SearchFields>({
    title: '',
    city: '',
  });

  const [listMode, setListMode] = useState(true);
  const [uniqueCities, setUniqueCities] = useState<string[]>([]);

  useEffect(() => {
    const cities = CarnivalGroupList.reduce<string[]>(
      (cities, carnivalGroup) => {
        const { city } = carnivalGroup.location;
        if (!cities.includes(city)) {
          cities.push(city);
        }
        return cities;
      },
      []
    );
    setUniqueCities(cities);
  }, [CarnivalGroupList]);

  const handleListMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setListMode(value === 'list' ? true : false);
  };

  const handleSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch({ ...search, title: value });
  };
  const handleCityField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch({ ...search, city: value });
  };

  const filterGroups = () => {
    const filteredGroups: CarnivalGroup[] =
      search.title.trim().length > 0 || search.city.trim().length > 0
        ? CarnivalGroupList.filter(
            (group) =>
              group.title.toLowerCase().includes(search.title) &&
              group.location.city
                .toLowerCase()
                .includes(search.city.toLocaleLowerCase())
          )
        : CarnivalGroupList;

    setGroups(filteredGroups);
  };

  return (
    <div id="app">
      <main>
        <section className="hero">
          <div className="hero__container container">
            <div className="hero__heading">
              <span className="hero__tagline">Find Your Block</span>
              <div className="hero__headline">
                Encontre os <span>melhores blocos</span> de carnaval de 2023
              </div>
            </div>

            <div className="capturing-form">
              <div className="form-field">
                <div className="form-field__lead-icon">
                  <img src={searchIcon} alt="" />
                </div>
                <input
                  id="inputCityName"
                  type="text"
                  value={search.title}
                  placeholder={' '}
                  onChange={handleSearchField}
                />
                <label htmlFor="inputCityName">Pesquise por nome</label>
              </div>
              <div className="form-field">
                <div className="form-field__lead-icon">
                  <img src={locationIcon} alt="" />
                </div>

                <input
                  id="inputCityList"
                  type="text"
                  placeholder={' '}
                  list="cityList"
                  value={search.city}
                  onChange={handleCityField}
                />

                <label htmlFor="inputCityList">Selecione uma cidade</label>
                <datalist id="cityList">
                  {uniqueCities.map((city, index) => {
                    return (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    );
                  })}
                </datalist>
              </div>
              <button className="button" type="button" onClick={filterGroups}>
                Buscar Agora
              </button>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="content__container container">
            <div className="content__heading">
              <h2>Blocos recomendados</h2>
              <div className="content__view view-select">
                <input
                  className="view-select__input"
                  type="radio"
                  name="view-method"
                  id="viewMethodList"
                  value={'list'}
                  onChange={handleListMode}
                  checked={listMode}
                />
                <label htmlFor="viewMethodList">Lista</label>

                <input
                  className="view-select__input"
                  type="radio"
                  name="view-method"
                  id="viewMethodMap"
                  value={'map'}
                  onChange={handleListMode}
                  checked={!listMode}
                />
                <label htmlFor="viewMethodMap">Mapa</label>
              </div>
            </div>
            <ul className="content__list">
              {groups.map((group, index) => {
                return (
                  <CardCarnivalGroup
                    key={index}
                    coverPath={group.coverPath}
                    title={group.title}
                    description={group.description}
                    location={group.location}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
