import os

# Complete data for 100 Writing Tests (1 to 20 original + 21 to 100 new)
WRITING_TESTS_DATA = [
  # Tests 1-20 (original)
  (1, "Easy", "Line Graph", "test1", "The line graph below illustrates the changes in the global average temperature between 1980 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Some people believe governments should invest more in public transport than road infrastructure. To what extent do you agree or disagree?"),
  (2, "Easy", "Multiple Line Graph", "test2", "The line graph compares the number of internet users per 100 people in four different countries from 2000 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Many people think children should begin learning a foreign language at primary school. Do the advantages outweigh the disadvantages?"),
  (3, "Easy", "Bar Chart", "test3", "The bar chart shows worldwide mobile phone sales between 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Some people believe technology has made communication easier, while others think it has reduced real human interaction. Discuss both views and give your own opinion."),
  (4, "Easy", "Horizontal Bar Chart", "test4", "The bar chart compares the populations of five major cities in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Some people believe university education should be free for everyone. To what extent do you agree or disagree?"),
  (5, "Easy", "Grouped Column Chart", "test5", "The chart illustrates the value of goods exported from four continents between 2018 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "In many countries, people are living longer. What are the causes of this trend, and what effects does it have on society?"),
  (6, "Medium", "Pie Chart", "test6", "The pie chart shows the proportions of different energy sources used in a country in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Some people think governments should spend more money on healthcare than on other public services. Discuss both views and give your opinion."),
  (7, "Medium", "Multiple Pie Charts", "test7", "The pie charts compare the market shares of three companies in 2010, 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Some people think advertisements encourage us to buy unnecessary things, while others believe they provide useful information. Discuss both views and give your opinion."),
  (8, "Medium", "Table", "test8", "The table presents the number of international tourist arrivals in four countries between 2015 and 2019. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Some people believe that working from home is more beneficial than working in an office. Discuss both views and give your opinion."),
  (9, "Medium", "Table", "test9", "The table shows the percentage of households with internet access across three income groups in 2010, 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Some people think environmental problems should be solved internationally rather than nationally. Discuss both views and give your opinion."),
  (10, "Medium", "Map", "test10", "The maps below show how a university campus changed between 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.", "Many people choose to travel abroad rather than explore their own country. Why is this the case? Is it a positive or negative trend?"),
  (11, "Hard", "Process Diagram", "test11", "The diagram illustrates the process of producing sugar from sugar cane. Summarise the information by selecting and reporting the main features, and describe the process.", "Some people think success in life depends mainly on hard work, while others believe money and appearance are more important. Discuss both views and give your opinion."),
  (12, "Hard", "Process Diagram", "test12", "The diagram illustrates the stages of the natural water cycle. Summarise the information by selecting and reporting the main features.", "Some people believe that museums should focus on educating people, while others think they should mainly entertain visitors. Discuss both views and give your opinion."),
  (13, "Hard", "Mixed Chart", "test13", "The chart compares tourist arrivals and annual growth rates between 2015 and 2020. Summarise the information by selecting and reporting the main features.", "Some people think governments should control the amount of violence shown in films and television. To what extent do you agree or disagree?"),
  (14, "Hard", "Stacked Bar Chart", "test14", "The stacked bar chart illustrates energy consumption from four different sources between 2010 and 2020. Summarise the information by selecting and reporting the main features.", "In many countries, the gap between rich and poor is increasing. What problems does this cause, and what solutions can you suggest?"),
  (15, "Hard", "Area Chart", "test15", "The area chart shows changes in the world's total forest area between 2000 and 2020. Summarise the information by selecting and reporting the main features.", "Some people believe that schools should teach financial management as a compulsory subject. Do you agree or disagree?"),
  (16, "Hard", "Scatter Plot", "test16", "The scatter plot illustrates the relationship between GDP per capita and life expectancy in different countries. Summarise the information by selecting and reporting the main features.", "Some people believe that public libraries are no longer necessary because information is available online. Discuss both views and give your opinion."),
  (17, "Hard", "Bubble Chart", "test17", "The bubble chart compares the market share, profit margin and sales performance of five products. Summarise the information by selecting and reporting the main features.", "Many people think that international tourism creates more benefits than problems. To what extent do you agree or disagree?"),
  (18, "Hard", "Population Pyramid", "test18", "The population pyramid illustrates the age and gender distribution of a country's population in 2020. Summarise the information by selecting and reporting the main features.", "Some people believe that children should spend less time using electronic devices and more time playing outdoors. Discuss both views and give your opinion."),
  (19, "Hard", "Dual Axis Line Graph", "test19", "The graph compares carbon dioxide emissions and GDP between 2010 and 2020. Summarise the information by selecting and reporting the main features.", "Many people believe that the best way to reduce crime is to give longer prison sentences. To what extent do you agree or disagree?"),
  (20, "Hard", "Comparison Diagram", "test20", "The diagrams compare the average amount of household water used per day in 2000 and 2020. Summarise the information by selecting and reporting the main features.", "Some people think that the main purpose of education is to prepare students for employment, while others believe it should develop individuals more broadly. Discuss both views and give your opinion.")
]

# Prompts data generator for Tests 21 to 100
# 80 unique, non-repetitive IELTS Task 1 & Task 2 prompts
NEW_PROMPTS = [
    # 21
    ("Medium", "Line Graph", "The line graph below shows the average daily electricity consumption in a European nation during summer and winter from 2010 to 2022. Summarise the information by selecting and reporting the main features.", 
     "In some countries, more and more people are choosing to live alone. What are the causes of this development, and is it a positive or negative trend for society?"),
    # 22
    ("Medium", "Bar Chart", "The bar chart illustrates the proportion of male and female science graduates in four different universities in 2021. Summarise the information by selecting and reporting the main features.",
     "Some people believe that sports facilities should be free for all citizens to encourage healthier lifestyles. To what extent do you agree or disagree?"),
    # 23
    ("Medium", "Pie Chart", "The pie charts compare household expenditure patterns in a UK town across five categories in 1990 and 2020. Summarise the information by selecting and reporting the main features.",
     "Many employers now prefer online video interviews over traditional face-to-face meetings. Do the advantages of this trend outweigh the disadvantages?"),
    # 24
    ("Medium", "Table", "The table presents data on public library usage in five European cities between 2015 and 2020, including total visits and book loans. Summarise the information by selecting and reporting the main features.",
     "Some people argue that space exploration is a waste of government funding when there are urgent problems on Earth. Discuss both views and give your opinion."),
    # 25
    ("Medium", "Process Diagram", "The diagram shows the steps involved in recycling plastic bottles into synthetic fleece fiber. Summarise the information by selecting and reporting the main features and describing the process.",
     "With the growth of online shopping, traditional physical stores are closing. What issues does this cause for local communities, and what measures can be taken to support high streets?"),
    # 26
    ("Medium", "Map", "The maps illustrate the structural changes to a coastal village following the construction of a marina between 1995 and 2020. Summarise the information by selecting and reporting the main features.",
     "Some people believe that young people should undertake compulsory unpaid community work after high school. To what extent do you agree or disagree?"),
    # 27
    ("Hard", "Mixed Chart", "The bar chart shows average weekly working hours in five countries, while the table shows employee job satisfaction rates. Summarise the information by selecting and reporting the main features.",
     "Artificial intelligence is increasingly used to make judicial and medical decisions. Do the benefits of AI in decision-making outweigh the risks?"),
    # 28
    ("Hard", "Line Graph", "The line graph shows passenger traffic across three major transport modes (rail, bus, air) in a nation between 1980 and 2020. Summarise the information by selecting and reporting the main features.",
     "Some people think that universities should accept equal numbers of male and female students in every subject. To what extent do you agree or disagree?"),
    # 29
    ("Hard", "Bar Chart", "The bar chart compares the percentage of waste recycled in six European nations between 2005 and 2020. Summarise the information by selecting and reporting the main features.",
     "Many historical objects belong to museums in foreign countries. Some people argue that these objects should be returned to their countries of origin. Discuss both views and give your opinion."),
    # 30
    ("Hard", "Table", "The table details the average calorie consumption and fruit intake per person per day in four region groups in 2020. Summarise the information by selecting and reporting the main features.",
     "In many cities, housing has become unaffordable for average citizens. What are the primary causes of rising housing prices, and what solutions can governments implement?"),

    # 31-40
    ("Medium", "Multiple Line Graph", "The line graph shows changes in urban, suburban, and rural populations in a North American state from 1970 to 2020.", "Some people think that high salary is the most important factor when choosing a job, while others value job satisfaction more. Discuss both views and give your opinion."),
    ("Medium", "Grouped Column Chart", "The column chart illustrates the amount of grain produced by five major exporting countries between 2012 and 2022.", "With modern technology, people can work from anywhere in the world. Is this a positive or negative development for family life?"),
    ("Medium", "Multiple Pie Charts", "The pie charts show the sources of renewable energy generated in a country in 2010, 2015, and 2020.", "Some people believe that celebrity endorsements encourage young people to consume unhealthy food and products. To what extent do you agree or disagree?"),
    ("Medium", "Table", "The table compares average monthly rainfalls and temperatures in three capital cities throughout 2021.", "In many countries, traditional arts such as pottery and weaving are declining. Should governments subsidize traditional arts, or should market forces decide their survival?"),
    ("Medium", "Process Diagram", "The diagram shows the process of desalination used to produce drinkable water from seawater.", "Some people argue that children should be assigned homework every day, while others believe homework causes unnecessary stress. Discuss both views and give your opinion."),
    ("Medium", "Map", "The maps show the layout of an industrial estate before and after redevelopment into a residential park.", "Many fast-food items contain high amounts of sugar and salt. Should governments impose extra taxes on unhealthy food?"),
    ("Hard", "Stacked Bar Chart", "The stacked bar chart compares energy consumption in residential, commercial, and industrial sectors across four countries.", "In the modern digital era, face-to-face social interaction is decreasing. What problems does this cause, and how can individuals improve real-world social connections?"),
    ("Hard", "Area Chart", "The area chart illustrates land degradation levels by cause (deforestation, overgrazing, agriculture) across three regions.", "Some people think that news media focuses too much on negative events rather than positive achievements. What are the effects of this trend on public mental health?"),
    ("Hard", "Scatter Plot", "The scatter plot displays average income levels versus college graduation rates across 30 administrative districts.", "Many species of wild animals are facing extinction due to human activities. Why is biodiversity important, and what measures can be taken to protect endangered species?"),
    ("Hard", "Dual Axis Line Graph", "The graph illustrates total car ownership figures alongside public bus passenger totals between 2000 and 2020.", "Some people believe that art and music education in schools should be replaced with STEM subjects. To what extent do you agree or disagree?"),

    # 41-50
    ("Medium", "Line Graph", "The line graph tracks the average price of coffee beans and tea leaves per kilogram from 2010 to 2023.", "In many societies, grandparents play a major role in caring for young children. What are the benefits and drawbacks of this arrangement?"),
    ("Medium", "Bar Chart", "The bar chart displays the number of international exchange students hosted by six universities in 2022.", "Some people think that advertising targeted at children should be completely banned. Discuss both views and give your opinion."),
    ("Medium", "Pie Chart", "The pie chart depicts the primary modes of transport used by commuters in a major metropolis in 2022.", "With the rise of artificial intelligence, many manual and analytical jobs may be automated. How can governments prepare the workforce for future job markets?"),
    ("Medium", "Table", "The table shows the breakdown of municipal waste management methods (landfill, incineration, recycling, composting) in four nations.", "Some people believe that sports personalities are paid too much money compared to essential workers such as nurses and teachers. Do you agree or disagree?"),
    ("Medium", "Process Diagram", "The flow chart shows the commercial production of olive oil from harvesting to bottling.", "Many historic buildings are located in valuable city centers. Should historic buildings be preserved, or replaced with modern high-rise accommodation?"),
    ("Medium", "Map", "The maps illustrate proposed plans for expanding a city's underground subway network between 2020 and 2030.", "Some people argue that learning history is irrelevant for young people today. To what extent do you agree or disagree?"),
    ("Hard", "Mixed Chart", "The line graph shows air pollution index levels while the bar chart shows vehicle registration numbers from 2015 to 2022.", "In many countries, young graduates struggle to find employment in their field of study. What are the underlying causes, and what steps should universities take?"),
    ("Hard", "Stacked Bar Chart", "The chart displays the proportion of household expenditure spent on food, housing, clothing, and entertainment by age group.", "Some people believe that international sports competitions like the Olympics foster global peace, while others think they encourage nationalistic rivalry. Discuss both views and give your opinion."),
    ("Hard", "Population Pyramid", "The population pyramids compare the demographic structure of a nation in 1960, 2010, and projected for 2050.", "As nations become wealthier, health problems related to sedentary lifestyles are increasing. What solutions can be implemented to promote physical activity?"),
    ("Hard", "Comparison Diagram", "The diagrams compare a rural farm layout in 1980 with its conversion into an eco-tourism park in 2020.", "Some people believe that individuals should take personal responsibility for their health, while others think the government should enforce healthy lifestyle choices. Discuss both views."),

    # 51-60
    ("Medium", "Line Graph", "The graph shows annual milk production figures across four major agricultural regions between 2005 and 2020.", "With the growth of global tourism, many local cultures are adopting western customs. Is cultural homogenization a positive or negative development?"),
    ("Medium", "Bar Chart", "The bar chart illustrates the average time spent daily on social media by different age groups in 2023.", "Some people think that university students should pay the full cost of their education, while others argue that higher education should be funded by taxpayers. Discuss both views."),
    ("Medium", "Pie Chart", "The pie charts illustrate the proportion of book sales by genre (fiction, non-fiction, educational, children's) in 2010 and 2020.", "Many people now prefer buying secondhand goods rather than brand-new products. What factors have led to this trend, and what impact does it have on the economy?"),
    ("Medium", "Table", "The table presents survey data regarding public satisfaction with local bus, train, and tram services in 2022.", "Some people believe that prison should be purely for punishment, while others think rehabilitation is the main purpose of incarceration. Discuss both views and give your opinion."),
    ("Medium", "Process Diagram", "The process diagram shows how paper is manufactured from wood pulp and recycled paper.", "With modern healthcare, life expectancy is increasing rapidly. What challenges does an ageing population pose for healthcare infrastructure?"),
    ("Medium", "Map", "The maps compare an airport passenger terminal layout in 2010 with its expanded configuration in 2023.", "Some people think that children should be allowed to make their own choices regarding school subjects and hobbies. To what extent do you agree or disagree?"),
    ("Hard", "Mixed Chart", "The chart compares global smartphone shipments with average selling prices per unit between 2014 and 2022.", "In many countries, fast fashion clothing is cheap and discarded quickly. What environmental problems does fast fashion cause, and how can consumers reduce textile waste?"),
    ("Hard", "Scatter Plot", "The scatter plot displays average weekly hours of physical exercise versus medical consultation rates across 25 towns.", "Some people believe that scientists should be free to conduct any research they choose, while others argue that ethical guidelines must restrict certain research. Discuss both views."),
    ("Hard", "Bubble Chart", "The chart shows the R&D expenditure, patent filings, and market valuation of six technology corporations.", "Many people move from rural areas to major urban centers in search of work. What problems does rapid urbanization create for infrastructure, and how can rural economies be revived?"),
    ("Hard", "Dual Axis Line Graph", "The graph displays renewable energy investment amounts alongside greenhouse gas emission levels from 2010 to 2022.", "Some people argue that strict dress codes should be enforced in all professional workplaces, while others favor casual attire. Discuss both views and give your opinion."),

    # 61-70
    ("Medium", "Line Graph", "The line graph shows the percentage of women in parliamentary positions across five regions between 2000 and 2020.", "Some people think that national museum admission should be completely free for all visitors. To what extent do you agree or disagree?"),
    ("Medium", "Bar Chart", "The bar chart displays the volume of timber exported by four nations from 2015 to 2022.", "With online streaming services, fewer people visit cinemas to watch movies. Do the advantages of home streaming outweigh the drawbacks for the film industry?"),
    ("Medium", "Pie Chart", "The pie chart depicts the primary sources of household electricity generation in a Scandinavian country in 2022.", "Some people believe that parents should be legally responsible if their minor children commit crimes. To what extent do you agree or disagree?"),
    ("Medium", "Table", "The table details hotel occupancy rates across four seasonal quarters in three tourist cities.", "In many corporate environments, remote working has reduced team cohesion. What steps can companies take to maintain employee collaboration in remote settings?"),
    ("Medium", "Process Diagram", "The diagram illustrates how solar energy is converted into residential electricity using rooftop PV panels and storage batteries.", "Some people believe that school students should learn practical skills like cooking and home repairs alongside academic subjects. Do you agree or disagree?"),
    ("Medium", "Map", "The maps illustrate the transformation of a disused railway line into an urban greenway corridor.", "Many people believe that plastic packaging should be banned for all food items. What alternative materials exist, and what challenges might a total plastic ban create?"),
    ("Hard", "Stacked Bar Chart", "The stacked bar chart shows the proportion of university funding derived from tuition, government grants, and research partnerships.", "Some people think that public transport drivers and emergency workers should not be allowed to go on strike. To what extent do you agree or disagree?"),
    ("Hard", "Area Chart", "The area chart depicts global freshwater withdrawals by sector (agriculture, industry, domestic) from 1990 to 2020.", "In the modern economy, changing careers several times during a working life is common. What are the advantages and disadvantages of changing careers frequently?"),
    ("Hard", "Population Pyramid", "The population pyramids compare urban and rural demographic structures in a developing nation in 2022.", "Some people argue that governments should tax sugar-sweetened beverages to combat obesity. To what extent do you agree or disagree?"),
    ("Hard", "Comparison Diagram", "The diagrams compare traditional brick-and-mortar library layouts with modern digital media hubs.", "With automated news aggregators, people are exposed to biased news feeds. What impact does algorithmic news customization have on public opinion?"),

    # 71-80
    ("Medium", "Line Graph", "The line graph shows the percentage of employees working flexible hours in five industry sectors between 2010 and 2022.", "Some people think that all students should be required to study mathematics until the age of 18. To what extent do you agree or disagree?"),
    ("Medium", "Bar Chart", "The bar chart compares electric vehicle sales across four continents in 2020 and 2022.", "In many countries, young people are delaying marriage and parenthood. What are the causes of this social shift, and how does it impact demographics?"),
    ("Medium", "Pie Chart", "The pie charts illustrate the proportion of time spent on administrative vs clinical tasks by hospital doctors in 2012 and 2022.", "Some people believe that public funding should support elite professional athletes, while others think it should fund grassroots sports. Discuss both views."),
    ("Medium", "Table", "The table presents figures on domestic and imported fruit consumption in four European countries in 2021.", "With rapid technological advancement, many older people struggle to use digital devices. How can society bridge the digital divide for elderly citizens?"),
    ("Medium", "Process Diagram", "The diagram shows the biological and industrial steps in composting municipal organic waste.", "Some people think that governments should build more roads to reduce traffic congestion, while others believe this encourages more car usage. Discuss both views."),
    ("Medium", "Map", "The maps show the development of a suburban shopping district between 2000 and 2020.", "Many consumer electronics are designed to become obsolete within a few years. Should manufacturers be legally required to make products easily repairable?"),
    ("Hard", "Mixed Chart", "The chart shows annual rainfall totals alongside crop yield figures for wheat and corn from 2012 to 2022.", "Some people believe that learning a second language is unnecessary because machine translation tools are improving rapidly. To what extent do you agree or disagree?"),
    ("Hard", "Scatter Plot", "The scatter plot displays country ranking in global happiness surveys against average working hours per week.", "In many countries, city centers are becoming increasingly crowded and polluted. What measures can municipal authorities take to make city centers more livable?"),
    ("Hard", "Bubble Chart", "The bubble chart compares average tuition fees, post-graduation employment rates, and student numbers across 8 university faculties.", "Some people argue that companies should be forced to hire a minimum percentage of workers over 50 years old. Do you agree or disagree?"),
    ("Hard", "Dual Axis Line Graph", "The graph displays internet bandwidth expansion alongside e-commerce transaction volumes between 2010 and 2022.", "Many people believe that wild animals should not be kept in zoos or safari parks. To what extent do you agree or disagree?"),

    # 81-90
    ("Medium", "Line Graph", "The line graph tracks the proportion of households with smart home automation systems in four countries from 2015 to 2023.", "Some people think that school uniforms should be mandatory in all schools. Discuss the advantages and disadvantages of mandatory uniforms."),
    ("Medium", "Bar Chart", "The bar chart compares the volume of paper, glass, plastic, and metal recycled by a city municipality in 2018 and 2022.", "In many countries, people are spending more time commuting to work. What problems does long commuting cause for individuals, and how can employers reduce commute times?"),
    ("Medium", "Pie Chart", "The pie chart depicts the share of global container shipping handled by six major maritime ports in 2022.", "Some people believe that artificial intelligence will eliminate human creativity in art, music, and writing. Do you agree or disagree?"),
    ("Medium", "Table", "The table details average monthly hotel room rates and occupancy percentages across five resort destinations.", "Many schools now offer online remote learning alongside classroom teaching. Do the advantages of hybrid learning outweigh the disadvantages for secondary students?"),
    ("Medium", "Process Diagram", "The diagram illustrates the industrial process of refining crude oil into gasoline, diesel, and aviation fuel.", "Some people think that international trade agreements benefit wealthy nations more than developing nations. Discuss both views and give your opinion."),
    ("Medium", "Map", "The maps show changes to a university sports complex layout following an expansion project between 2012 and 2022.", "With increased automation in manufacturing, many traditional artisanal crafts are disappearing. Is the loss of traditional manufacturing skills a significant problem?"),
    ("Hard", "Stacked Bar Chart", "The stacked bar chart compares greenhouse gas emissions by industry sector (transport, agriculture, power, construction) across four nations.", "Some people argue that governments should regulate the content published on social media platforms to prevent misinformation. Discuss both views."),
    ("Hard", "Area Chart", "The area chart displays global renewable energy capacity growth by technology (wind, solar, hydro, biomass) from 2010 to 2022.", "In many societies, success is measured primarily by wealth and material possessions. What alternative measures of personal success can you suggest?"),
    ("Hard", "Population Pyramid", "The population pyramids compare demographic projections for a developed nation in 2020 and 2060.", "Some people believe that parents should monitor their teenage children's online activity, while others argue teenagers deserve privacy. Discuss both views."),
    ("Hard", "Comparison Diagram", "The diagrams compare traditional paper archival storage with modern cloud database infrastructure.", "With global supply chains, food items travel thousands of miles before reaching consumers. What environmental issues does long-distance food transport cause?"),

    # 91-100
    ("Medium", "Line Graph", "The line graph illustrates the percentage of university graduates entering self-employment between 2010 and 2022.", "Some people think that physical textbooks will eventually be replaced entirely by digital tablets in schools. Do you agree or disagree?"),
    ("Medium", "Bar Chart", "The bar chart displays the average annual spending on pet care products in four countries in 2022.", "In many cities, bicycles are becoming a popular form of urban transport. What infrastructure changes are needed to make urban cycling safer and more practical?"),
    ("Medium", "Pie Chart", "The pie charts compare the sources of funding for public scientific research projects in 2010 and 2020.", "Some people believe that individuals should lower their standard of living to protect the environment, while others think technology will solve ecological problems. Discuss both views."),
    ("Medium", "Table", "The table shows the number of scientific research papers published in four disciplines across three continents in 2021.", "With the rise of gig economy jobs like ride-sharing and food delivery, worker job security is changing. Is the growth of the gig economy a positive or negative trend?"),
    ("Medium", "Process Diagram", "The flow chart illustrates how geothermal power stations convert underground heat into electricity.", "Some people think that children should start formal school education at age 4, while others believe formal schooling should begin at age 7. Discuss both views."),
    ("Medium", "Map", "The maps compare a historical city harbor layout in 1950 with its modern waterfront commercial development.", "In many countries, young people prefer living in rented accommodation rather than buying a home. What factors explain this trend, and what are its long-term social effects?"),
    ("Hard", "Mixed Chart", "The graph shows passenger numbers while the table shows customer satisfaction ratings for four airline carriers in 2022.", "Some people argue that international aid to developing countries should be given in the form of medical and technical expertise rather than money. Discuss both views."),
    ("Hard", "Scatter Plot", "The scatter plot illustrates average annual expenditure on public healthcare versus life expectancy across 35 countries.", "With rapid technological advances, workplace stress is on the rise. What steps can companies and employees take to ensure a healthy work-life balance?"),
    ("Hard", "Bubble Chart", "The bubble chart compares startup funding raised, team size, and revenue growth across 6 technology sectors.", "Some people believe that television talent shows provide genuine career opportunities for young artists, while others think they exploit participants for entertainment. Discuss both views."),
    ("Hard", "Dual Axis Line Graph", "The graph tracks total solar energy installation capacity alongside per-kilowatt generation cost from 2010 to 2022.", "In many countries, public libraries are evolving into community learning centers offering digital literacy courses. Is this evolution a positive or negative development?")
]

# Generate all 100 tests
for idx, (diff, chart_type, t1_q, t2_q) in enumerate(NEW_PROMPTS, start=21):
    img_asset = f"test{idx}"
    WRITING_TESTS_DATA.append((idx, diff, chart_type, img_asset, t1_q, t2_q))

target_file = os.path.join("src", "data", "writing", "tests.js")

# File header imports
imports_code = []
for i in range(1, 101):
    imports_code.append(f'import test{i} from "../../assets/writing/task1/test{i}.png";')

tests_code = ["const writingTests = ["]

for item in WRITING_TESTS_DATA:
    t_id, diff, c_type, img_var, t1_q, t2_q = item
    t1_q_escaped = t1_q.replace('"', '\\"')
    t2_q_escaped = t2_q.replace('"', '\\"')
    
    test_obj = f"""  {{
    id: {t_id},
    title: "Writing Test {t_id}",
    duration: 60,
    difficulty: "{diff}",

    task1: {{
      image: {img_var},
      type: "{c_type}",
      question:
        "{t1_q_escaped}"
    }},

    task2: {{
      question:
        "{t2_q_escaped}"
    }}
  }}"""
    tests_code.append(test_obj + ",")

tests_code.append("];\n\nexport default writingTests;\n")

full_content = "\n".join(imports_code) + "\n\n" + "\n".join(tests_code)

with open(target_file, "w", encoding="utf-8") as f:
    f.write(full_content)

print(f"Successfully generated all {len(WRITING_TESTS_DATA)} Writing Tests in {target_file}!")
