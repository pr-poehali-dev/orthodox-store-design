import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  image: string;
  description: string;
  year: number;
}

interface CartItem extends Book {
  quantity: number;
}

const books: Book[] = [
  {
    id: 1,
    title: 'Святое Евангелие',
    author: 'Евангелисты',
    price: 850,
    category: 'Священное Писание',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/7d83447f-cbb3-4321-8734-6eef9b4ad704.jpg',
    description: 'Четвероевангелие с параллельными местами и комментариями',
    year: 2023
  },
  {
    id: 2,
    title: 'Псалтирь',
    author: 'Царь Давид',
    price: 650,
    category: 'Священное Писание',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/60a260b8-ea90-4402-86ea-29747d23e0d7.jpg',
    description: 'Книга псалмов на церковнославянском языке',
    year: 2023
  },
  {
    id: 3,
    title: 'Жития святых',
    author: 'Свт. Димитрий Ростовский',
    price: 1200,
    category: 'Жития святых',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/2e1b9d5f-8c27-4023-84e6-164b6cbc1ef8.jpg',
    description: 'Полное собрание житий святых на весь год',
    year: 2022
  },
  {
    id: 4,
    title: 'Молитвослов',
    author: 'Православная Церковь',
    price: 450,
    category: 'Молитвословы',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/60a260b8-ea90-4402-86ea-29747d23e0d7.jpg',
    description: 'Полный молитвослов для мирян',
    year: 2024
  },
  {
    id: 5,
    title: 'Добротолюбие',
    author: 'Святые отцы',
    price: 1500,
    category: 'Духовная литература',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/7d83447f-cbb3-4321-8734-6eef9b4ad704.jpg',
    description: 'Собрание творений святых отцов о духовной жизни',
    year: 2021
  },
  {
    id: 6,
    title: 'Лествица',
    author: 'Прп. Иоанн Лествичник',
    price: 750,
    category: 'Духовная литература',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/2e1b9d5f-8c27-4023-84e6-164b6cbc1ef8.jpg',
    description: 'Руководство к духовному совершенству',
    year: 2023
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'about' | 'contacts' | 'faq' | 'account'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все категории');

  const categories = ['Все категории', 'Священное Писание', 'Жития святых', 'Молитвословы', 'Духовная литература'];

  const addToCart = (book: Book) => {
    const existingItem = cart.find(item => item.id === book.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredBooks = selectedCategory === 'Все категории' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <Icon name="Cross" size={32} className="text-secondary" />
              <div>
                <h1 className="text-2xl font-bold">Благовест</h1>
                <p className="text-xs opacity-90">Православная книга</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-primary-foreground hover:text-secondary" onClick={() => setCurrentView('home')}>
                Главная
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-secondary" onClick={() => setCurrentView('catalog')}>
                Каталог
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-secondary" onClick={() => setCurrentView('about')}>
                О нас
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-secondary" onClick={() => setCurrentView('contacts')}>
                Контакты
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-secondary" onClick={() => setCurrentView('faq')}>
                FAQ
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-secondary" onClick={() => setCurrentView('account')}>
                <Icon name="User" size={20} />
              </Button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-destructive">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartCount > 0 ? `Товаров в корзине: ${cartCount}` : 'Ваша корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.author}</p>
                            <p className="text-sm font-semibold mt-2">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button size="sm" variant="ghost" className="ml-auto" onClick={() => removeFromCart(item.id)}>
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {cartCount > 0 && (
                  <div className="mt-8 space-y-4">
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Итого:</span>
                      <span>{cartTotal} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="space-y-12">
            <section className="text-center py-16 px-4 bg-gradient-to-b from-primary/10 to-background rounded-lg">
              <Icon name="BookOpen" size={64} className="mx-auto text-primary mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Православная литература</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Духовные книги для укрепления веры и души. Широкий выбор священных текстов, житий святых и богословской литературы.
              </p>
              <Button size="lg" onClick={() => setCurrentView('catalog')}>
                Перейти в каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold">Популярные книги</h3>
                <Button variant="outline" onClick={() => setCurrentView('catalog')}>
                  Смотреть все
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.slice(0, 6).map(book => (
                  <Card key={book.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-md mb-4" />
                      <CardTitle className="text-xl">{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="mb-2">{book.category}</Badge>
                      <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{book.price} ₽</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedBook(book)}>
                          <Icon name="Eye" size={16} />
                        </Button>
                        <Button size="sm" onClick={() => addToCart(book)}>
                          <Icon name="ShoppingCart" size={16} />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-muted rounded-lg p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Icon name="Truck" size={48} className="mx-auto text-primary mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Доставка по России</h4>
                  <p className="text-muted-foreground">Быстрая и надёжная доставка в любой регион</p>
                </div>
                <div>
                  <Icon name="ShieldCheck" size={48} className="mx-auto text-primary mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Гарантия качества</h4>
                  <p className="text-muted-foreground">Только проверенные издательства</p>
                </div>
                <div>
                  <Icon name="Heart" size={48} className="mx-auto text-primary mb-4" />
                  <h4 className="text-xl font-semibold mb-2">С любовью к делу</h4>
                  <p className="text-muted-foreground">15 лет помогаем людям найти духовную литературу</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'catalog' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Каталог</h2>
              <p className="text-muted-foreground">Выберите категорию или просмотрите все книги</p>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-md mb-4" />
                    <CardTitle className="text-xl">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-2">{book.category}</Badge>
                    <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{book.price} ₽</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedBook(book)}>
                        Подробнее
                      </Button>
                      <Button size="sm" onClick={() => addToCart(book)}>
                        В корзину
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">О нас</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Интернет-магазин «Благовест» работает с 2009 года и является одним из ведущих магазинов православной литературы в России.
                </p>
                <p>
                  Наша миссия — помогать людям в духовном развитии, предоставляя доступ к качественной православной литературе. Мы тщательно отбираем книги от проверенных издательств, имеющих благословение Русской Православной Церкви.
                </p>
                <p>
                  В нашем ассортименте более 5000 наименований: Священное Писание, жития святых, молитвословы, богословская и духовная литература, книги для детей и взрослых.
                </p>
                <p>
                  Мы работаем напрямую с крупнейшими православными издательствами: «Сретенский монастырь», «Никея», «Даръ», «Христианская жизнь» и многими другими.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Наши преимущества</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <Icon name="Check" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Проверенное качество</h4>
                    <p className="text-sm text-muted-foreground">Работаем только с официальными издательствами</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Check" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Быстрая доставка</h4>
                    <p className="text-sm text-muted-foreground">Отправляем заказы в течение 1-2 дней</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Check" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Доступные цены</h4>
                    <p className="text-sm text-muted-foreground">Регулярные акции и скидки</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Check" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Консультации</h4>
                    <p className="text-sm text-muted-foreground">Поможем выбрать подходящую литературу</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'contacts' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Свяжитесь с нами</CardTitle>
                  <CardDescription>Мы всегда рады помочь вам</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@blagovest-books.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Православная, д. 10</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-muted-foreground">Понедельник - Пятница: 9:00 - 18:00</p>
                      <p className="text-muted-foreground">Суббота: 10:00 - 16:00</p>
                      <p className="text-muted-foreground">Воскресенье: выходной</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Напишите нам</CardTitle>
                  <CardDescription>Заполните форму, и мы свяжемся с вами</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input placeholder="Введите имя" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="example@mail.ru" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <Input placeholder="Ваш вопрос или пожелание" />
                  </div>
                  <Button className="w-full">Отправить сообщение</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentView === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">Как оформить заказ?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Добавьте понравившиеся книги в корзину, нажмите «Оформить заказ», заполните форму с контактными данными и адресом доставки. После оформления с вами свяжется наш менеджер для подтверждения.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">Какие способы оплаты доступны?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы принимаем оплату банковскими картами онлайн, через СБП, наличными при получении, а также безналичным переводом для юридических лиц.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">Сколько стоит доставка?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Стоимость доставки зависит от региона и способа доставки. По Москве в пределах МКАД — 300 руб., при заказе от 3000 руб. — бесплатно. Доставка почтой России рассчитывается по тарифам почты.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">Как долго идёт доставка?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  По Москве — 1-2 дня. В регионы России почтой — 5-14 дней в зависимости от удалённости. Курьерскими службами (СДЭК, Boxberry) — 3-7 дней.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">Можно ли вернуть или обменять книгу?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, вы можете вернуть или обменять книгу в течение 14 дней, если она не была в употреблении, сохранён товарный вид и упаковка. Возврат по браку возможен в любое время.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg">Есть ли у вас скидки?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, мы регулярно проводим акции. При заказе от 5000 руб. — скидка 5%, от 10000 руб. — 10%. Также действует накопительная система скидок для постоянных клиентов.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg">Можно ли заказать книгу, которой нет в каталоге?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, свяжитесь с нами по телефону или через форму обратной связи. Мы постараемся найти и привезти нужную вам книгу под заказ.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {currentView === 'account' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Личный кабинет</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                      <Icon name="User" size={48} className="text-primary-foreground" />
                    </div>
                    <CardTitle>Иван Петров</CardTitle>
                    <CardDescription>ivan@example.com</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full mb-2">Редактировать профиль</Button>
                  <Button variant="outline" className="w-full">Выйти</Button>
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>История заказов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">Заказ #1234</p>
                          <p className="text-sm text-muted-foreground">15 октября 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">2450 ₽</p>
                          <Badge>Доставлен</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">Заказ #1233</p>
                          <p className="text-sm text-muted-foreground">3 октября 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">1800 ₽</p>
                          <Badge variant="secondary">В пути</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Избранное</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">У вас пока нет избранных книг</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Cross" size={24} className="text-secondary" />
                <h3 className="text-xl font-bold">Благовест</h3>
              </div>
              <p className="text-sm opacity-90">Православная литература для укрепления веры</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Священное Писание</li>
                <li>Жития святых</li>
                <li>Молитвословы</li>
                <li>Духовная литература</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="cursor-pointer" onClick={() => setCurrentView('about')}>О нас</li>
                <li>Доставка и оплата</li>
                <li>Возврат товара</li>
                <li className="cursor-pointer" onClick={() => setCurrentView('faq')}>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>+7 (495) 123-45-67</li>
                <li>info@blagovest-books.ru</li>
                <li>г. Москва, ул. Православная, 10</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 opacity-20" />
          <div className="text-center text-sm opacity-75">
            <p>© 2024 Благовест. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBook.title}</DialogTitle>
                <DialogDescription>{selectedBook.author}</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <img src={selectedBook.image} alt={selectedBook.title} className="w-full rounded-lg" />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">{selectedBook.category}</Badge>
                    <p className="text-muted-foreground">{selectedBook.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Год издания:</span>
                      <span className="font-semibold">{selectedBook.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Автор:</span>
                      <span className="font-semibold">{selectedBook.author}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-primary">{selectedBook.price} ₽</span>
                    <Button size="lg" onClick={() => {
                      addToCart(selectedBook);
                      setSelectedBook(null);
                    }}>
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}