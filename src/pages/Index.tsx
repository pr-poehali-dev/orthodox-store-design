import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  color: string;
  shade: string;
  category: string;
  image: string;
  description: string;
  volume: string;
  rating: number;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Стойкая крем-краска',
    brand: 'ColorPro',
    price: 599,
    oldPrice: 799,
    color: 'Фиолетовый',
    shade: '5.65 Лиловый каштан',
    category: 'Профессиональные',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/937ca7c0-c8bb-4ae0-9f67-f58c1d735401.jpg',
    description: 'Профессиональная стойкая крем-краска с ухаживающими компонентами. Обеспечивает насыщенный цвет и 100% закрашивание седины.',
    volume: '100 мл',
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: 'Интенсивный оттеночный бальзам',
    brand: 'VividShine',
    price: 399,
    color: 'Красный',
    shade: '6.66 Рубиновый красный',
    category: 'Оттеночные',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/58fbf9a0-3454-435e-b99a-57523d012158.jpg',
    description: 'Оттеночный бальзам для поддержания яркости цвета. Не содержит аммиака, подходит для частого применения.',
    volume: '150 мл',
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: 'Осветляющая пудра',
    brand: 'BlondeLux',
    price: 899,
    color: 'Блонд',
    shade: 'До 7 тонов',
    category: 'Осветление',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/3f1943d1-bbc5-49c0-ad33-518c292999ba.jpg',
    description: 'Профессиональная осветляющая пудра для достижения идеального блонда. Бережное осветление до 7 тонов.',
    volume: '500 г',
    rating: 4.9,
    inStock: true
  },
  {
    id: 4,
    name: 'Безаммиачная краска',
    brand: 'NaturalColor',
    price: 549,
    color: 'Каштановый',
    shade: '4.0 Каштан',
    category: 'Безаммиачные',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/58fbf9a0-3454-435e-b99a-57523d012158.jpg',
    description: 'Деликатная безаммиачная краска с натуральными маслами. Идеально подходит для чувствительной кожи головы.',
    volume: '100 мл',
    rating: 4.6,
    inStock: true
  },
  {
    id: 5,
    name: 'Тонирующая маска',
    brand: 'ColorPro',
    price: 449,
    color: 'Фиолетовый',
    shade: 'Холодный оттенок',
    category: 'Оттеночные',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/937ca7c0-c8bb-4ae0-9f67-f58c1d735401.jpg',
    description: 'Тонирующая маска для нейтрализации желтизны и поддержания холодных оттенков блонда.',
    volume: '200 мл',
    rating: 4.7,
    inStock: false
  },
  {
    id: 6,
    name: 'Крем-краска Extra',
    brand: 'VividShine',
    price: 649,
    color: 'Блонд',
    shade: '10.1 Платиновый блонд',
    category: 'Профессиональные',
    image: 'https://cdn.poehali.dev/projects/52cf1329-a82a-43e1-9c55-99cb5677d38e/files/3f1943d1-bbc5-49c0-ad33-518c292999ba.jpg',
    description: 'Профессиональная крем-краска для достижения холодных платиновых оттенков блонда.',
    volume: '100 мл',
    rating: 4.8,
    inStock: true
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.shade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold">ColorDream</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => setActiveTab('home')}>Главная</Button>
            <Button variant="ghost" onClick={() => setActiveTab('catalog')}>Каталог</Button>
            <Button variant="ghost" onClick={() => setActiveTab('about')}>О нас</Button>
            <Button variant="ghost" onClick={() => setActiveTab('contacts')}>Контакты</Button>
            <Button variant="ghost" onClick={() => setActiveTab('faq')}>FAQ</Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setActiveTab('account')}>
              <Icon name="User" size={20} />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {totalItems > 0 ? `Товаров: ${totalItems}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-4">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.shade}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}>
                                  <Icon name="Minus" size={12} />
                                </Button>
                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}>
                                  <Icon name="Plus" size={12} />
                                </Button>
                              </div>
                              <span className="font-bold">{item.price * item.quantity} ₽</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalItems > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold">Итого:</span>
                      <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
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

      <main className="container py-8">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-secondary p-12 text-white">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-5xl font-bold mb-4">Преобразите свой образ</h2>
                <p className="text-xl mb-6 text-white/90">
                  Профессиональные краски для волос от ведущих брендов. Яркие цвета, стойкий результат, забота о волосах.
                </p>
                <Button size="lg" variant="secondary" onClick={() => setActiveTab('catalog')}>
                  Смотреть каталог
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold">Популярные товары</h3>
                <Button variant="link" onClick={() => setActiveTab('catalog')}>
                  Все товары <Icon name="ArrowRight" size={16} className="ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                      {product.oldPrice && (
                        <Badge className="absolute top-3 right-3 bg-destructive">Скидка</Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">Нет в наличии</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardDescription>{product.brand}</CardDescription>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} name={i < Math.floor(product.rating) ? "Star" : "StarHalf"} size={14} className="fill-current" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="mb-2">{product.shade}</Badge>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <div>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through mr-2">{product.oldPrice} ₽</span>
                        )}
                        <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      </div>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        disabled={!product.inStock}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Icon name="Truck" size={32} className="text-primary mb-2" />
                  <CardTitle>Быстрая доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Доставим ваш заказ в течение 1-3 дней по всей России</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Shield" size={32} className="text-primary mb-2" />
                  <CardTitle>Гарантия качества</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Только оригинальная продукция от официальных производителей</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Headphones" size={32} className="text-primary mb-2" />
                  <CardTitle>Поддержка 24/7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Наши специалисты всегда готовы помочь с выбором краски</p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold mb-2">Каталог красок</h2>
              <p className="text-muted-foreground">Найдите идеальный оттенок для ваших волос</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Поиск по названию, бренду, оттенку..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:max-w-md"
              />
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Все' : category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    {product.oldPrice && (
                      <Badge className="absolute top-3 right-3 bg-destructive">Скидка</Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">Нет в наличии</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardDescription>{product.brand}</CardDescription>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name={i < Math.floor(product.rating) ? "Star" : "StarHalf"} size={14} className="fill-current" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-2">{product.shade}</Badge>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div>
                      {product.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through mr-2">{product.oldPrice} ₽</span>
                      )}
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={!product.inStock}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">О нас</h2>
              <p className="text-lg text-muted-foreground">
                ColorDream — это ваш надежный партнер в мире профессиональных красок для волос
              </p>
            </div>

            <Card>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Наша миссия</h3>
                  <p className="text-muted-foreground">
                    Мы создали ColorDream, чтобы каждый мог найти идеальный оттенок краски для волос. 
                    Наша команда профессионалов тщательно отбирает только лучшие продукты от проверенных 
                    производителей, чтобы вы могли безопасно экспериментировать с образом.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-2xl font-bold mb-3">Почему выбирают нас</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span>Только оригинальная продукция от официальных поставщиков</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span>Широкий ассортимент оттенков и брендов</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span>Консультации профессиональных колористов</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span>Быстрая доставка по всей России</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1" />
                      <span>Программа лояльности для постоянных клиентов</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-2xl font-bold mb-3">Наши ценности</h3>
                  <p className="text-muted-foreground">
                    Качество, честность и забота о клиентах — вот что движет нами каждый день. 
                    Мы верим, что красота должна быть доступной каждому, а качественные продукты 
                    не должны стоить целое состояние.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">
                Свяжитесь с нами любым удобным способом
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Icon name="Phone" size={24} className="text-primary mb-2" />
                  <CardTitle>Телефон</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-medium mb-1">+7 (800) 555-35-35</p>
                  <p className="text-sm text-muted-foreground">Звонок по России бесплатный</p>
                  <p className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Mail" size={24} className="text-primary mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-medium mb-1">info@colordream.ru</p>
                  <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="MapPin" size={24} className="text-primary mb-2" />
                  <CardTitle>Адрес</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-1">г. Москва</p>
                  <p className="text-sm text-muted-foreground">ул. Красная, д. 15, офис 301</p>
                  <p className="text-sm text-muted-foreground">Метро Площадь Революции</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Clock" size={24} className="text-primary mb-2" />
                  <CardTitle>Режим работы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-1">Пн-Пт: 9:00 - 21:00</p>
                  <p className="font-medium mb-1">Сб-Вс: 10:00 - 20:00</p>
                  <p className="text-sm text-muted-foreground">Без выходных</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
                <CardDescription>Мы ответим на любые ваши вопросы</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <Input placeholder="Тема сообщения" />
                  </div>
                  <div>
                    <textarea
                      className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="Ваше сообщение"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Частые вопросы</h2>
              <p className="text-lg text-muted-foreground">
                Ответы на самые популярные вопросы наших клиентов
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Как выбрать подходящий оттенок краски?</AccordionTrigger>
                <AccordionContent>
                  При выборе оттенка учитывайте ваш натуральный цвет волос, тон кожи и желаемый результат. 
                  Мы рекомендуем не осветлять волосы более чем на 2-3 тона за одно окрашивание. 
                  Наши консультанты всегда готовы помочь с выбором по телефону или в чате.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Какая разница между профессиональной и обычной краской?</AccordionTrigger>
                <AccordionContent>
                  Профессиональные краски содержат более качественные пигменты и ухаживающие компоненты. 
                  Они обеспечивают более стойкий и равномерный цвет, лучше закрашивают седину и меньше 
                  повреждают структуру волос. Для домашнего использования мы рекомендуем безаммиачные 
                  профессиональные краски.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Как долго держится краска на волосах?</AccordionTrigger>
                <AccordionContent>
                  Стойкость зависит от типа краски: стойкие крем-краски держатся 4-6 недель, 
                  полуперманентные — 2-3 недели, оттеночные бальзамы — 6-8 применений шампуня. 
                  Для продления стойкости цвета используйте специальные шампуни и бальзамы для 
                  окрашенных волос.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Можно ли осветлить темные волосы в блонд за одно окрашивание?</AccordionTrigger>
                <AccordionContent>
                  Резкое осветление может сильно повредить волосы. Мы рекомендуем постепенное осветление 
                  с интервалом 2-3 недели между процедурами. Для достижения платинового блонда с темных 
                  волос может потребоваться 2-4 сеанса с последующим тонированием.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Что делать, если цвет получился не таким, как ожидалось?</AccordionTrigger>
                <AccordionContent>
                  Если результат вас не устраивает, не паникуйте. Свяжитесь с нашими консультантами — 
                  мы поможем подобрать корректирующее средство. Важно не перекрашивать волосы сразу же, 
                  дайте им отдохнуть минимум неделю. Используйте восстанавливающие маски и масла.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Как часто можно красить волосы?</AccordionTrigger>
                <AccordionContent>
                  Стойкими красками рекомендуется красить корни раз в 4-6 недель. Полное окрашивание 
                  по всей длине лучше делать не чаще раза в 2-3 месяца. Оттеночные бальзамы можно 
                  применять раз в 1-2 недели для поддержания яркости цвета.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Какие условия доставки и оплаты?</AccordionTrigger>
                <AccordionContent>
                  Мы доставляем по всей России курьером и почтой. Доставка по Москве — 1-2 дня (бесплатно от 2000 ₽), 
                  по России — 3-7 дней. Оплата: картой на сайте, при получении наличными или картой, 
                  банковским переводом для юрлиц.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Есть ли у вас программа лояльности?</AccordionTrigger>
                <AccordionContent>
                  Да! При регистрации вы получаете 5% скидку на первый заказ. За каждую покупку начисляются 
                  бонусные баллы (1 балл = 1 рубль), которыми можно оплатить до 30% следующего заказа. 
                  Для постоянных клиентов действуют персональные предложения и ранний доступ к распродажам.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Личный кабинет</h2>
              <p className="text-lg text-muted-foreground">
                Управляйте своими заказами и профилем
              </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Профиль</TabsTrigger>
                <TabsTrigger value="orders">Заказы</TabsTrigger>
                <TabsTrigger value="favorites">Избранное</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Личная информация</CardTitle>
                    <CardDescription>Обновите свои данные</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Имя</label>
                        <Input placeholder="Введите имя" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Фамилия</label>
                        <Input placeholder="Введите фамилию" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Телефон</label>
                      <Input placeholder="+7 (___) ___-__-__" />
                    </div>
                    <Button>Сохранить изменения</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Адрес доставки</CardTitle>
                    <CardDescription>Укажите адрес для быстрого оформления заказов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Город</label>
                      <Input placeholder="Москва" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Адрес</label>
                      <Input placeholder="Улица, дом, квартира" />
                    </div>
                    <Button>Сохранить адрес</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>История заказов</CardTitle>
                    <CardDescription>Отслеживайте статус своих заказов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">У вас пока нет заказов</p>
                      <Button onClick={() => setActiveTab('catalog')}>
                        Перейти в каталог
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Избранные товары</CardTitle>
                    <CardDescription>Товары, которые вам понравились</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">У вас пока нет избранных товаров</p>
                      <Button onClick={() => setActiveTab('catalog')}>
                        Перейти в каталог
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>{selectedProduct.brand}</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full rounded-lg" />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="text-base">{selectedProduct.shade}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name={i < Math.floor(selectedProduct.rating) ? "Star" : "StarHalf"} size={18} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">({selectedProduct.rating})</span>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Описание</h4>
                    <p className="text-muted-foreground">{selectedProduct.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Категория:</span>
                      <p className="font-medium">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Объем:</span>
                      <p className="font-medium">{selectedProduct.volume}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Цвет:</span>
                      <p className="font-medium">{selectedProduct.color}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Наличие:</span>
                      <p className="font-medium">{selectedProduct.inStock ? 'В наличии' : 'Нет в наличии'}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      {selectedProduct.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through mr-2">{selectedProduct.oldPrice} ₽</span>
                      )}
                      <span className="text-3xl font-bold text-primary">{selectedProduct.price} ₽</span>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={!selectedProduct.inStock}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-16 py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sparkles" size={24} className="text-primary" />
                <h3 className="text-xl font-bold">ColorDream</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональные краски для волос с доставкой по всей России
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="h-auto p-0" onClick={() => setActiveTab('catalog')}>Каталог</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => setActiveTab('faq')}>Доставка и оплата</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => setActiveTab('faq')}>Возврат товара</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => setActiveTab('account')}>Личный кабинет</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">О компании</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" className="h-auto p-0" onClick={() => setActiveTab('about')}>О нас</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => setActiveTab('contacts')}>Контакты</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => setActiveTab('faq')}>FAQ</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (800) 555-35-35</li>
                <li>info@colordream.ru</li>
                <li>Ежедневно 9:00 - 21:00</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 ColorDream. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
