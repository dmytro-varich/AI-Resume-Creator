# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем зависимости
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Копируем исходный код
COPY . /app

# Открываем порт 5000 для Flask-приложения
EXPOSE 5000

# Запускаем приложение
CMD ["python", "ParsingService.py"]