<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=7E22CE&height=300&section=header&text=RNAliza&desc=Motorola%20Science%20Cup%20Bioinformatyka&fontSize=90&fontColor=ffffff"/></p>
Projekt stworzony na potrzeby zadania Bioinformatyka z konkursu Motorola Science Cup. Aplikacja służy do analizy zarówno DNA jak i RNA. 

## Spis treści
* [Hosting](#hosting)
* [Instalacja](#instalacja)
* [API](#api)
* [Aplikacja](#aplikacja)
* [Podsumowanie](#podsumowanie)

## Hosting
<a href="https://grondig.github.io/motorola/">Aplikacja</a> 
[API](#api)

## Instalacja
Z aplikacji można korzystać poprzez hosting, ale ponad to można uruchomić ją lokalnie. Poniżej znajduje się instrukcja jak tego dokonać.

### Pobieranie kodu źródłowego
```bash
git clone https://github.com/grondiG/motorola.git
```
### Instalacja paczek
Aby aplikacja działała poprawnie należy zainstalować odpowiednie paczki.
```bash
npm run packages
```
W przypadku gdy konsola systemowa nie obsługuje składni "&&" należy po kolei wpisać następujące komendy.
```bash
npm install
cd backend
npm install
cd ../frontend
npm install
cd ../
```
### Start aplikacji

```
npm run dev
```
Po wpisaniu powyższej komendy na systemie powinny odpalić się dwie usługi na portach 3000 i 5173 odpowiadające kolejno za serwer REST API i samą aplikację.
Aplikacja będzie dostępna pod adresem ```localhost:5173``` a API pod ```localhost:3000```
## API
Na potrzeby tego projektu powstało autorskie REST API pozwalające na analizę zarówno sekwencji DNA jak i RNA.
### Główny route ```https://www.grondihub.live/```
### Uzyskiwanie sekwencji aminokwasów oraz ich danych dla pojedynczego białka
#### Request:
W miejsce ```:req``` należy wpisać sekwencję DNA/RNA która zawiera:
* Kodon start.
* Kodon stop.
* Zbiór liter sekwencji pomiędzy powyższymi kodonami podzielny przez 3.
```
/api/sequence/:seq
```
---
#### Response:
Przykładowa odpowiedź dla :req = AUGAAAUAG:
```json
{
   "sequence":"MK",
   "info":[
      {
         "letter":"M",
         "weight":131.18,
         "hydropathyIndex":1.9,
         "pka":{
            "pka1":2.28,
            "pka2":9.21,
            "pka3":0
         },
         "polarity":0,
         "pi":5.75,
         "residue":50.58
      },
      {
         "letter":"K",
         "weight":128.18,
         "hydropathyIndex":-3.9,
         "pka":{
            "pka1":2.18,
            "pka2":8.95,
            "pka3":10.53
         },
         "polarity":1,
         "pi":5.57,
         "residue":49.42
      }
   ]
}
```
##### Legenda:
```json
{
	"sequence":"Sekwencja aminokwasów",
	"info":[
		{
			"letter":"Pojedyncza litera aminokwasu",
			"weight":"Masa molowa aminokwasu"
			"hydropathyIndex":"Indeks hydrofobowy",
			"pka":{
				"pka1":"Grupa karboksylowa",
				"pka2":"Jony amonowe",
				"pka3":"Łańcuchy boczne"
			},
			"polarity":"Polarność (1: polarne, 0: nie polarne)",
			"pi": "Punkt izoelektryczny",
			"residue": "Procent masy aminokwasu względem całego białka"
		}
	]
}
```

### Uzyskiwanie sekwencji aminokwasów oraz ich danych dla wielu białek
#### Request:
W miejsce ```:req``` należy wpisać sekwencję DNA/RNA która zawiera:
* Kodon start.
* Kodon stop.
* Zbiór liter sekwencji pomiędzy powyższymi kodonami podzielny przez 3.
* W przeciwieństwie do poprzedniej ścieżki można wprowadzić większą liczbę białek co jest ukazane w przykładzie poniżej.
```
/api/sequences/:seq
```
---
#### Response:
Przykładowa odpowiedź dla :req = AUGAAAUAGAUGAUACUAUAG:
```json
{
  "sequences": [
    {
      "sequence": "MK",
      "info": [
        {
          "letter": "M",
          "weight": 131.18,
          "hydropathyIndex": 1.9,
          "pka": {
            "pka1": 2.28,
            "pka2": 9.21,
            "pka3": 0
          },
          "polarity": 0,
          "pi": 5.75,
          "residue": 50.58
        },
        {
          "letter": "K",
          "weight": 128.18,
          "hydropathyIndex": -3.9,
          "pka": {
            "pka1": 2.18,
            "pka2": 8.95,
            "pka3": 10.53
          },
          "polarity": 1,
          "pi": 5.57,
          "residue": 49.42
        }
      ]
    },
    {
      "sequence": "MIL",
      "info": [
        {
          "letter": "M",
          "weight": 131.18,
          "hydropathyIndex": 1.9,
          "pka": {
            "pka1": 2.28,
            "pka2": 9.21,
            "pka3": 0
          },
          "polarity": 0,
          "pi": 5.75,
          "residue": 36.69
        },
        {
          "letter": "I",
          "weight": 113.18,
          "hydropathyIndex": 4.5,
          "pka": {
            "pka1": 2.36,
            "pka2": 9.6,
            "pka3": 0
          },
          "polarity": 0,
          "pi": 5.98,
          "residue": 31.66
        },
        {
          "letter": "L",
          "weight": 113.18,
          "hydropathyIndex": 3.8,
          "pka": {
            "pka1": 2.36,
            "pka2": 9.62,
            "pka3": 0
          },
          "polarity": 0,
          "pi": 5.99,
          "residue": 31.66
        }
      ]
    }
  ]
}
```
##### Legenda:
```json
{
	"sequences":[
	{
	"sequence":"Sekwencja aminokwasów",
	"info":[
		{
			"letter":"Pojedyncza litera aminokwasu",
			"weight":"Masa molowa aminokwasu"
			"hydropathyIndex":"Indeks hydrofobowy",
			"pka":{
				"pka1":"Grupa karboksylowa",
				"pka2":"Jony amonowe",
				"pka3":"Łańcuchy boczne"
			},
			"polarity":"Polarność (1: polarne, 0: nie polarne)",
			"pi": "Punkt izoelektryczny",
			"residue": "Procent masy aminokwasu względem całego białka"
		}
	  ]
	 }
	]
}
```
### Uzyskiwanie wzoru strukturalnego białka

#### Request:
Aby uzyskać zdjęcie należy w miejsce ```:req``` podstawić sekwencję na tych samych zasadach co powyżej.
```
/api/sequenceImg/:seq
```
---
#### Response:
Odpowiedzią jest zdjęcie w formacie .png. Jego szerokość jest zależna od ilości wprowadzonych danych w sekwencji.
### Uzyskiwanie masy molowej całego białka
#### Request:
Aby uzyskać zdjęcie należy w miejsce ```:req``` podstawić sekwencję na tych samych zasadach co powyżej.
```
/api/proteinWeight/:seq
```
---
#### Response:
Przykładowa odpowiedź:
```json
{"weight":259.36944}
```
## Aplikacja
### Zastosowane technologie
<p align="left">
	<a href="https://github.com/vitejs/vite"><img src="https://www.svgrepo.com/show/374167/vite.svg" title="Vite" width="45"
			height="45"/></a>
	<a href="https://github.com/facebook/react"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React" width="45"
							 height="45"/></a>
	<a href="https://github.com/pmndrs/react-three-fiber"><img src="https://i.ibb.co/nR0GHtJ/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f746875.png" title="Threejs" width="45"
								   height="45"/></a>
	<a href="https://github.com/nodejs/node"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" title="Node.js" width="45"
						      height="45"/></a>
	<a href="https://github.com/expressjs/express"><img src="https://i.ibb.co/JcmjdbW/Expressjs.png" title="Express"
						      height="35"/></a>
</p>

### Przewodnik

#### Panel pierwszy
Korzystanie z aplikacji zaczynamy od panelu pierwszego, dzieli on ekran na dwie części, lewą oraz prawą. Lewa część składa się z miejsca pozwalającego wpisać sekwencję białek, przycisków kolejno czyszczącym okienko z sekwencji oraz potwierdzający sekwencję. W lewym dolnym rogu znajduję się tooltip mówiący o możliwościach wprowadzenia danych. Sekwencja może składać się jedynie z liter A,C,G,T,U gdzie wpisanie pierwszy raz jednego z dwóch ostatnich dyktuje to czy mamy doczynienia z RNA czy DNA. Klikając w przycisk po lewej stronie od kontenera wprowadzania możemy w szybki sposób zmienić DNA na RNA i odwrotnie. W prawej części tuż po wprowadzeniu sekwencji ukazuje się przestrzenny model DNA który rośnie wraz z wprowadzoną ilością znaków. Model ten można obracać w osi poziomej.

<img src="https://i.ibb.co/vH5J3GM/obraz.png"/>

#### Panel drugi

Po przesłaniu sekwencji w poprzednim panelu oraz po załadowaniu ukazuje nam się panel drugi. Część ta jest złożona głównie ze zdjęcia wizualizującego nam naszą sekwencję białek. Gdy sekwencja nie mieści się na ekranie wystarczy przsunąć ją wzdłuż osi poziomej po najechaniu na niej. Klikając w odpowiedni przycisk możemy pobrać lub otworzyć zdjęcie w nowej karcie.

<img src="https://i.ibb.co/jHp7dtZ/obraz.png"/>

W przypadku w którym podaliśmy więcej niż jedną sekwencję, po prawej stronie ukaże się strzałka pozwalająca na przejście do innej sekwencji.

<img src="https://i.ibb.co/sRrnQbL/obraz.png"/>
<img src="https://i.ibb.co/5cdVTqJ/obraz.png"/>

#### Panel trzeci

Po zejściu niżej ujrzymy wykresy z których możemy odczytać takie wartości jak: Masę, Indeks hydrofobowy, pKa, punkt izoteryczny, polarność oraz procent występowania danego aminokwasu w białku.

<img src="https://i.ibb.co/mbRWY1j/3.png"/>

Każdy z wykresów jest interaktywny i po najechaniu myszką można zobaczyć odpowiadającą wartość.

## Podsumowanie

Podczas całego procesu tworzenia bardzo dużo się nauczyliśmy. Początkowe założenie było takie aby cały projekt zrobić schludnie oraz porządnie tak aby wszystkie funkcjonalności zgadzały się z wytycznymi. 

Naszą pracę podzieliliśmy po równo tak aby każdy mógł wnieść coś od siebie. Trzy osoby zajmowały się strefą wizualną, a dwie funkcjonalną. Pierwszym większym celem jaki sobie postawiliśmy było stworzenie animowany interaktywny model 3D DNA. Dzięki temu polepszyliśmy swoją znajomość biblioteki Three.js a raczej jej wersją przepisaną na tą odpowiadającą Reactowi. 

Zdecydowanie najwięcej czasu poświęciliśmy na odpowiednią wizualizację struktury białek. Wykorzystując znajomość dobrych praktyk przy większych aplikacjach podzieliliśmy projekt na Frontend czyli widoczną na obrazkach stronę oraz Backend, serwer pozwalający na łączenie odpowiednich zdjęć oraz wyliczanie potrzebnych danych. Serwer został postawiony na wirtualnej maszynie Ubuntu, co również dokształciło nas w strefie trochę odbiegającej od tematu czyli serwerowego podejścia, np SSL, nginx itp. 

Podczas tworzenia odpowiedniego kodu pod API musieliśmy się douczyć pewnych kwestii związanych z biologią. Np. kiedy aminokwas jest polarny a kiedy nie, lub to jak wyliczyć punkt izoteryczny posiadając pKa.

Najbardziej dumni czujemy się z wypełnienia naszych początkowych założeń np. "Tego aby aplikacja nie odstraszała użytkownika". Oraz tego że na przestrzeni ostatnich paru miesięcy aplikacja nie stała w miejscu, tzn zawsze gdy pojawiał się jakiś nowy pomysł staraliśmy się go implementować niekiedy zmieniając formę całej aplikacji. Finalnie jesteśmy zadowoleni z efektów końcowych, mimo tego że na pierwszy rzut oka, projekt wydawał się banalny a przez to nudny okazało się że jest na odwrót i z wypełnieniem kolejnego założenia pojawiało się nowe. Godziny spędzone na oglądaniu różnych wykładów, czytaniu prac naukowych oraz prób zaimplementowania tego w kodzie zrekompensowały nam naszą chęć zdobycia wiedzy.
